const gridContainerColor = "#252930"
const gridItemColor = "#161a1e"

export default theme => ({
    app: {
        width: "100%",
        height: "100%"
    },
    gridContainer: {
        display: "grid",
        width: "100%",
        height: "100%",
        minWidth: 0,
        backgroundColor: gridContainerColor,
        gap: "1px",
        gridTemplateAreas: `
                             "left orderBook advancedChart liveOrders right"                        
                             "left orderBook liveTrades liveOrders right"
                           `,
        gridTemplateColumns: "1fr minmax(253px, 320px) minmax(510px, 880px) minmax(253px, 320px) 1fr",
        gridTemplateRows: "minmax(auto, 70vh) minmax(auto, 30vh)",
    },
    orderBook: {
        gridArea: "orderBook",
        backgroundColor: gridItemColor,
        overflow: "auto",
        overflowX: "hidden"
    },
    liveOrders: {
        gridArea: "liveOrders",
        backgroundColor: gridItemColor,
        overflow: "auto",
        overflowX: "hidden"
    },
    liveTrades: {
        gridArea: "liveTrades",
        backgroundColor: gridItemColor,
        overflow: "auto",
        overflowX: "hidden"
    },
    advancedChart: {
        gridArea: "advancedChart",
        backgroundColor: gridItemColor
    },
    left: {
        gridArea: "left",
        backgroundColor: gridItemColor
    },
    right: {
        gridArea: "right",
        backgroundColor: gridItemColor
    }
})