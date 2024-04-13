function Login() {

    var uid  = document.getElementById("uid").value.toString();
    var pass = document.getElementById("pass").value.toString();   
    $.getJSON("https://script.google.com/macros/s/AKfycbz6EJStK1BT17SLsU4Ra4Ky3NqUI7hJ9PxCSV0KfhFZNkSGEn482aW_Dt5XXH-puhag1w/exec?page=LoginCheck",
     {
        uid: uid,
        pass: pass
     },
    function (data){                              //01
            if (data.result == "true") {
                window.open('invoice.html');
                /* $.ajax("\invoice.html", {
                    success: function(response) {
                      $('#DivLogin').hide();
                      $('#DivMain').html(response);
                    }
                  }); */
              }
              else
              {
                  $('#RetMsg').html("Incorrect ID or Password !!!");
                  $('#RetMsg').show();
              }
        });

} 

function OpenMain(data) {
   $('#DivLogin').hide();
   $('#DivMain').html(data);
}

function ClearText() {
      $('#RetMsg').html("");
      $('#RetMsg').hide();
}

function LogOut() {
    ClearText();
    document.getElementById("uid").value = '';
    document.getElementById("pass").value = '';
    $('#DivLogin').show();
    $('#DivMain').html("");
} 

$(document).ready(function(){
    //FillNameDataList();
    Login();
});

function FillNameDataList()
{
        $.getJSON("https://script.google.com/macros/s/AKfycbz6EJStK1BT17SLsU4Ra4Ky3NqUI7hJ9PxCSV0KfhFZNkSGEn482aW_Dt5XXH-puhag1w/exec?page=dropdownName", 
        function (data) {                              //01
          var Options="";                              
          $.each(data, function(key, value)            //02
          {
            Options = Options + '<option>' + value + '</option>';   //03
            //console.log(value);
          });
          $(".cust_nm").append(Options);               //04
        });
}