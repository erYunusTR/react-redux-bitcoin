$(function () {
    var placeholder = $('#orders_placeholder');
    /**
     * This variable is an example of subscription message. By changing its event property to: "bts:unsubscribe"
     * you can delete your subscription and stop receiving events.
     */
    var subscribeMsg = {
        "event": "bts:subscribe",
        "data": {
            "channel": "live_orders_btcusd"
        }
    };
    var orderTypes = ['order_created', 'order_changed', 'order_deleted'];
    /**
     * Define a variable for websocket
     */
    var ws;
    initWebsocket();

    /**
     * Serializes an order to HTML when it's received.
     */
    function serializeOrder(eventName, data) {
        if ($('ol li').length > 30) {
            placeholder.find('li:first').remove();
        }
        placeholder.append('<li>[' + eventName + '] (' + data.datetime + ') ' + data.id + ': ' + data.amount + ' BTC @ ' + data.price + ' USD ' + ((data.order_type == 0) ? 'BUY' : 'SELL') + '</li>');
    }

    function initWebsocket() {
        ws = new WebSocket("wss://ws.bitstamp.net");

        ws.onopen = function () {
            ws.send(JSON.stringify(subscribeMsg));
        };

        ws.onmessage = function (evt) {
            response = JSON.parse(evt.data);
            /**
             * This statement handles message logic. It processes data in case of order_created,
             * order_changed or order_deleted events.
             * Reconnects if the server requires.
             */
            if (orderTypes.indexOf(response.event) !== -1) {
                serializeOrder(response.event, response.data);
            } else if (response.event === 'bts:request_reconnect') {
                initWebsocket();
            }
        };

        /**
         * In case of unexpected close event, try to reconnect.
         */
        ws.onclose = function () {
            console.log('Websocket connection closed');
            initWebsocket();
        };
    }
});