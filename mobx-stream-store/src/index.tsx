import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {action, observable} from 'mobx';
import {observer} from 'mobx-react';
import DevTools from 'mobx-react-devtools';

import { actions as projectActions, Project, projectSore } from './store/projects';
import { actions as groupActions, Group, groupStore } from './store/groups';
import { actions as articleActions, Article, articleStore, calcStat } from './store/articles';

import { getAll, getByProp } from './tools';

class VM {
    @observable selectedProject: number = 1;
    @observable selectedGroup: number = 1;

    @action selectGroup(id: number) {
        this.selectedGroup = id;
    }
}

const ArticleStats = (props: {stats: {total: number, change: number}}) => {
    return <i> -- {props.stats.total.toFixed(2)} _ <small>{props.stats.change.toFixed(4)}</small></i>
}

@observer
class ArticleListView extends React.Component<{group: Group}, {}> {
    constructor(props) {
        super(props);
        articleActions.fetch(props.group.id);
    }

    componentWillReceiveProps(nextProps: {group: Group}) {
        articleActions.fetch(nextProps.group.id);
    }

    render() {
        const articles = getByProp('groupId', articleStore, [this.props.group.id]);
        return (
            <div>
                <h3>Article</h3>
                <h4>Summary <ArticleStats stats={calcStat(articles)}/> </h4>
                {articles.map(art => (<div>
                    {art.title}
                    <ArticleStats stats={calcStat([art])}/>
                </div>))}
            </div>
        )
    }
}

@observer
class GroupView extends React.Component<{project: Project, vm: VM}, {}> {
    vm: VM;
    constructor(props) {
        super(props);
        this.vm = props.vm;
        groupActions.fetch(props.project.id);
    }

    componentWillReceiveProps(nextProps: {project: Project}) {
        if (nextProps.project.id !== this.props.project.id) {
            groupActions.fetch(nextProps.project.id);
        }
    }

    render() {
        const groups = getByProp('projectId', groupStore, [this.props.project.id])
        console.log('asd');
        return (
            <div>
                <h1>Groups</h1>
                {
                    groups.map(i => 
                        <div key={i.id} onClick={() => {this.vm.selectGroup(i.id)}}>
                            {i.id === this.vm.selectedGroup ? <b>{i.title}</b>: i.title}</div>
                    )
                }

                <ArticleListView group={groupStore.get(this.vm.selectedGroup)} />
            </div>
        )
    }
}

@observer
class TimerView extends React.Component<undefined, {}> {
    vm: VM;
    constructor() {
        super();
        this.vm = new VM;
    }
    componentWillMount() {
        projectActions.fetch();
    }

    render() {
        const projects = getAll(projectSore);
        return (
            <div>
                {projects.map(i => <div onClick={() => this.vm.selectedProject = i.id} key={i.id}>
                    {i.id === this.vm.selectedProject ? <b>{i.title}</b> : i.title}
                </div>)}
                <GroupView vm={this.vm} project={projects[this.vm.selectedProject]} />
                <DevTools />
            </div>
        );
     }

};

ReactDOM.render(<TimerView />, document.getElementById('root'));
