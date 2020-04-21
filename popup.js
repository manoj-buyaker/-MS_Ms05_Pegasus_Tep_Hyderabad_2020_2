$(function () {
    //disply the existing values

    chrome.storage.sync.get(['total', 'limit'], function (budget) {
        $('#total').text(budget.total);
        $('#limit').text(budget.limit);
    });
    //click Event added to button

    $('#spendAmount').click(function () {
        chrome.storage.sync.get(['total', 'limit'], function (budget) {
            var newTotal = 0;
            if (budget.total) {
                newTotal += parseInt(budget.total);
            }
            //text input values added
            var amount = $('#amount').val();
            if (amount) {
                newTotal += parseInt(amount);
            }
            //setting new values to chrome storage
            chrome.storage.sync.set({ 'total': newTotal }, function () {
                if (amount && newTotal >= budget.limit) {
                    var notifOptions = {
                        type: "basic",
                        iconUrl: "icon48.png",
                        title: "Limit reached!",
                        message: "Uh oh, look's like you've reached your limit."
                    };
                    //basic notification created using chrome notification API

                    chrome.notifications.create('limitNotif', notifOptions);

                }
            });
            //update UI values
            $('#total').text(newTotal);
            $('#amount').val('');



        });
    });
});