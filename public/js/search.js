$(function(){

    $("#btnSearch").on('click',(e)=>{
        $(".alert").hide();
        // input button value check
        // 
        if($("#inputSearch").val()){
            $(".alert").show().val("Please type in valid entry.")
            $(".alert").fadeTo(2000, 500).slideUp(500, function(){
            $(".alert").slideUp(500);
            });
        }
        });
});
        
