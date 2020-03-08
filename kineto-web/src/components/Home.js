import React     from 'react'
import Timeline from 'react-calendar-timeline'
import 'react-calendar-timeline/lib/Timeline.css'
import moment from 'moment'

var keys = {
    groupIdKey: "id",
    groupTitleKey: "title",
    itemIdKey: "id",
    itemTitleKey: "title",
    itemGroupKey: "group",
    itemTimeStartKey: "start_time",
    itemTimeEndKey: "end_time"
};

const groupsDefault = [
    {
        id: 1,
        title: 'group 1'
    },
    {
        id: 2,
        title: 'group 2'
    }
];

const itemsDefault = [
    {
        id: 1,
        group: 1,
        title: 'item 1',
        start_time: moment(),
        end_time: moment().add(1, 'hour')
    },
    {
        id: 2,
        group: 2,
        title: 'item 2',
        start_time: moment().add(-0.5, 'hour'),
        end_time: moment().add(0.5, 'hour')
    },
    {
        id: 3,
        group: 1,
        title: 'item 3',
        start_time: moment().add(2, 'hour'),
        end_time: moment().add(3, 'hour')
    }
];


class Home extends React.Component{
    constructor(props) {
        super(props);
        const defaultTimeStart = moment()
            .startOf("day")
            .toDate();

        const defaultTimeEnd = moment()
            .startOf("day")
            .add(1, "day")
            .toDate();

        this.state = {
            groups :groupsDefault,
            items : itemsDefault,
            defaultTimeStart,
            defaultTimeEnd
        };
    }

    //
    // const [items, setItems] = useState(itemsDefault);
    // const [groups, setGroups] = useState(groupsDefault);

    handleItemMove = (itemId, dragTime, newGroupOrder) => {
        const { items, groups } = this.state;

        const group = groups[newGroupOrder];

        this.setState({
            items: items.map(item =>
                item.id === itemId
                    ? Object.assign({}, item, {
                        start_time: dragTime,
                        end_time: dragTime + (item.end_time - item.start_time),
                        group: group.id
                    })
                    : item
            )
        });
        console.log("Moved", itemId, dragTime, newGroupOrder);
    };

    handleItemResize = (itemId, time, edge) => {
        const { items } = this.state;

        this.setState({
            items: items.map(item =>
                item.id === itemId
                    ? Object.assign({}, item, {
                        start_time: edge === "left" ? time : item.start_time,
                        end_time: edge === "left" ? item.end_time : time
                    })
                    : item
            )
        });

        console.log("Resized", itemId, time, edge);
    };
    render() {
        const { groups, items, defaultTimeStart, defaultTimeEnd } = this.state;
        return (
            <div>
                Rendered by react!
                <Timeline
                    groups={groups}
                    items={items}
                    keys={keys}
                    canMove={true}
                    canResize={"both"}
                    defaultTimeStart={defaultTimeStart}
                    defaultTimeEnd={defaultTimeEnd}
                    onItemMove={this.handleItemMove}
                    onItemResize={this.handleItemResize}
                    dragSnap = {30 * 60 * 1000}
                    stackItems ={true}
                />
            </div>
        )
    }
};

export default Home;
