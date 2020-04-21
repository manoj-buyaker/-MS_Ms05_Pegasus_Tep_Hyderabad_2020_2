$(function(){
// get the already stored  limit values
    chrome.storage.sync.get('limit',function(budget){
        $('#limit').val(budget.limit);
    });
//set the limit value to chrome storage

    $('#saveLimit').click(function(){
        var limit = $('#limit').val();
        if (limit){
            chrome.storage.sync.set({'limit': limit}, function(){
                close();
            });
        }
    });
//added  click event to reset button

    $('#resetTotal').click(function(){
        chrome.storage.sync.set({'total': 0}, function(){
          
            var notifOptions = {
                type: "basic",
                iconUrl: "icon48.png",
                title: "Resetting Total",
                message: "Total has been reset to 0."
            };
           
            chrome.notifications.create('resetNotif', notifOptions);
           
        });
    });
});