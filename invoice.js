function GetPrint()
{
    /*For Print*/
    /*
    if(document.getElementById("discount").value  <= 0){
            document.getElementById("discount").style.visibility= "hidden";
            document.getElementById("disclable").style.visibility= "hidden";    
    }

    document.getElementById("lapbleprintNote").innerText="This is Computer generated Invoice no signature Required";

    window.print();   */

    var ua = navigator.userAgent.toLowerCase();
    var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");

   if (isAndroid) {
        alert("in Android")
        setTimeout(function(){
            window.print();
            
          },1000);
    } else {
      window.print();
    }  
    document.getElementById("disclable").style.visibility= "visible";
    document.getElementById("discount").style.visibility= "visible";
    document.getElementById("lapbleprintNote").innerText="";
}
/* window.addEventListener("afterprint", (event) => {
    alert("After")

  }); */


function BtnAdd()
{
    /*Add Button*/
    var v = $("#TRow").clone().appendTo("#TBody") ;
    $(v).find("input").val('');
    $(v).removeClass("d-none");
    $(v).find("th").first().html($('#TBody tr').length - 1);
}

function BtnDel(v)
{
    var amts =  document.getElementsByName("amt");
    if(amts.length >2){
        var result;  
        var r = confirm("Do you want to Delete this Record!");  
        if (r == true) {  
            /*Delete Button*/
            $(v).parent().parent().remove(); 
            GetTotal();

            $("#TBody").find("tr").each(
            function(index)
            {
            $(this).find("th").first().html(index);
            }

        ); 
        }    
    }
}

function Calc(v)
{
    /*Detail Calculation Each Row*/
    var index = $(v).parent().parent().index();

    if(parseInt(v.value) <= 0){
        document.getElementsByName(v.name)[index].value ="";
        return;
    }  

    var qty = document.getElementsByName("qty")[index].value;
    var rate = document.getElementsByName("rate")[index].value;

    var amt = qty * rate;
    document.getElementsByName("amt")[index].value = amt;
    //To set value on hidden row 
    document.getElementsByName("item_nm")[0].selectedIndex  = 1;

    GetTotal();
}

function GetTotal()
{
    /*Footer Calculation*/   

    var sum=0;
    var amts =  document.getElementsByName("amt");

    for (let index = 1; index < amts.length; index++)
    {
        var amt = amts[index].value;
        sum = +(sum) +  +(amt) ; 
    }
    var discount =   document.getElementById("discount").value 
     sum=sum-discount;
[0]
    document.getElementById("FTotal").value = sum ;
 
}

$(document).ready(function(){
    SetCurrentDate();
    BtnAdd();
    FillItemDataList();
    FillNameDataList();
    MaxInv();
});

function SetCurrentDate()
	{
		const date = new Date();
		//console.log(date);

		let d = date.getDate();
		let m = date.getMonth() + 1;
		let y = date.getFullYear();

		if (d < 10) d = '0' + d;
		if (m < 10) m = '0' + m;

		let CurrDate = y + '-' + m + '-' + d;

		// $('input[name="inv_dt"]').val(CurrDate);  //Using jQuery
		document.getElementsByName("inv_dt")[0].value = CurrDate ;     

	}

    function FillItemDataList()
{
        $.getJSON("https://script.google.com/macros/s/AKfycbz6EJStK1BT17SLsU4Ra4Ky3NqUI7hJ9PxCSV0KfhFZNkSGEn482aW_Dt5XXH-puhag1w/exec?page=dropdownItem", 
        function (data) {                              //01
          var Options="";                              
          $.each(data, function(key, value)            //02
          {
            Options = Options + '<option>' + value + '</option>';   //03
            //console.log(value);
          });
          $(".item_nm").append(Options);               //04
        });
                
        document.getElementsByName("qty")[0].value = 0 ; 
        document.getElementsByName("rate")[0].value = 0 ; 
        document.getElementsByName("amt")[0].value = 0 ; 
}

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

function MaxInv()
    {
        
        $.getJSON("https://script.google.com/macros/s/AKfycbz6EJStK1BT17SLsU4Ra4Ky3NqUI7hJ9PxCSV0KfhFZNkSGEn482aW_Dt5XXH-puhag1w/exec?page=max", 
        function (data) { 
            let numbers = data.match(/\d+/g);
            //console.log(numbers);
            if(numbers != null && numbers.length == 2){
                let year = new Date().getFullYear();
                let counter= numbers[1];
                if( year == numbers[0])
                    counter++;
                else {
                    counter=1;
                }
                const newLocal = "input[name='inv_no']";
                $(newLocal).val(year + "-"+ counter.toString().padStart(4,"0"));
            }
            else{            
                let year = new Date().getFullYear();
                let counter= 1;
                const newLocal = "input[name='inv_no']";
                $(newLocal).val(year + "-"+ counter.toString().padStart(4,"0"));
            }           

        });
    }
    
  
