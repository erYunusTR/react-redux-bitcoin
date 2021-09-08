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
        gridTemplateRows: "auto auto",
    },
    orderBook: {
        gridArea: "orderBook",
        backgroundColor: gridItemColor
        //backgroundColor: "red" //delete later
    },
    liveOrders: {
        gridArea: "liveOrders",
        backgroundColor: gridItemColor
        //backgroundColor: "green" //delete later
    },
    liveTrades: {
        gridArea: "liveTrades",
        backgroundColor: gridItemColor
        //backgroundColor: "blue" //delete later
    },
    advancedChart: {
        gridArea: "advancedChart",
        backgroundColor: gridItemColor
        //backgroundColor: "orange" //delete later
    },
    left: {
        gridArea: "left",
        backgroundColor: gridItemColor
        //backgroundColor: "purple" //delete later
    },
    right: {
        gridArea: "right",
        backgroundColor: gridItemColor
        //backgroundColor: "purple" //delete later
    }
})