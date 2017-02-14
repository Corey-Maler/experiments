import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {action, observable} from 'mobx';
import {observer} from 'mobx-react';
import DevTools from 'mobx-react-devtools';

import { actions as projectActions, Project, projectSore } from './store/projects';
import { actions as groupActions, Group, groupStore } from './store/groups';
import { actions as articleActions, Article, articleStore, calcStat } from './store/articles';

import { getAll, getByProp, getByPropExt } from './tools';

import { State } from './store/thread';

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

const Box = ({radius}: {radius: number}) => {
    return <div style={{display: 'inline-block', "margin-right": 5, opacity: radius, width: 10, height: 10, background: "rgb(249, 186, 9)", "border-radius": "3px","border": "1px solid rgb(187, 141, 5)"}}></div>
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
        const articles = getByPropExt('groupId', articleStore, [this.props.group.id]);
        return (
            <div>
                <h3>Article</h3>
                <h4>Summary (state {articles.state}) <ArticleStats stats={articles.reduce(calcStat, {total: 0, change: 0}).values[0]}/> </h4>
                {articles.values.map(art => (<div key={art.value.id}>
                    {
                        art.state === State.loading? <div>loading</div> :
                       <div>{art.value.title}
                           <div>
                                <Box radius={art.value.val} />
                                <Box radius={0.3} />
                                <Box radius={0.3} />
                                <Box radius={0.3} />
                                <Box radius={0.3} />
                                <Box radius={0.3} />
                                <Box radius={0.3} />
                                <Box radius={0.3} />
                           </div>
                            {/*<ArticleStats stats={calcStat([art])}/> */}
                        </div>
                    }
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
