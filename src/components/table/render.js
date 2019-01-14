export default {
    name: 'Render',
    functional: true,
    props: {
        row: Object,
        render: Function,
        index: Number,
        column: {
            type: Object,
            default: null
        }
    },
    render: (h, p) => {
        const params = {
            row: p.props.row,
            index: p.props.index
        };
        if (p.props.column) params.column = p.props.column;
        return p.props.render(h, params);
    }
};