let hello = "Hello world"

function doGet(request){
    //
     var custid = request.parameter.custid
     var oid = String(request.parameter.oid)
     var pname = request.parameter.pname
     var quantity = request.parameter.quantity
     //Logger.log(pname)
     var result = addorder(oid,custid,pname,quantity)
     //Logger.log(result)
     result = {}
     result['result']=200
     result = JSON.stringify(result);
     return ContentService.createTextOutput(result).setMimeType(ContentService.MimeType.JSON); 
    }
    
    
    function addorder(oid='111',custid='344',pname='hello',quantity=1){
      var sheeturl = 'https://docs.google.com/spreadsheets/d/1XgyrIzfcxIbnxb2UmxIzErh9JrxEcHtBBbsj7LQqJKY/edit?usp=sharing'
      var sheetname = 'สินค้า'
    
      var psheet = gspandas.gsdataframe(sheeturl,sheetname)
      var currentval = parseInt(psheet.getvalue('ชื่อสินค้า',pname,'ปริมาณ'),10)
      psheet.updatevalue('ชื่อสินค้า',pname,'ปริมาณ',currentval-quantity)
      var pinfo = psheet.getrowdict('ชื่อสินค้า',pname)[0]
      var trx = [Date(Date.now()).toString(),oid,custid,pinfo['รหัสสินค้า'],pinfo['ชื่อสินค้า'],pinfo['ราคา'],quantity]
    
      var sheetname = 'ออเดอร์'
      var osheet = gspandas.gsdataframe(sheeturl,sheetname)
    
      try{
        if(osheet.getvalue('ชื่อสินค้า',pname,'รหัสลูกค้า',custid,'ปริมาณ') > 0){
        //Logger.log("old"+osheet.getvalue('ชื่อสินค้า',pname,'ปริมาณ'))
        osheet.updatevalue('ชื่อสินค้า',pname,'ปริมาณ',osheet.getvalue('ชื่อสินค้า',pname,'ปริมาณ')+1)
        //Logger.log("new"+osheet.getvalue('ชื่อสินค้า',pname,'ปริมาณ'))
        }
      }
      catch(e){
        osheet.sheet.appendRow(trx)
      }
    
    // updatevalue=function(findcol,findval,updatecol,updatevalue){
    //updatevalue('ชื่อสินค้า',pname,'ปริมาณ',currentval-quantity)
    //Logger.log(osheet.updatevalue)
      var fcol = osheet.getcolumns(['ชื่อสินค้า'])[0]
      var rind = fcol.indexOf(pname)+1
      var cind = osheet.columns.indexOf('ปริมาณ')
      
      Logger.log(fcol)
      Logger.log(rind)
      Logger.log(cind)
      
      //Logger.log(osheet.getcolumns("ชื่อสินค้า")[0])
      //Logger.log(osheet.getcolumns("ชื่อสินค้า")[0].indexOf(pname))
      //Logger.log(osheet.columns.indexOf("ชื่อสินค้า"))
    
    /**  
      if(checkdup == true){
        if(osheet.getvalue('ชื่อสินค้า',pname,'ปริมาณ')){
          osheet.sheet.appendRow(trx)
        }
        else{
          Logger.log(osheet.getvalue('ชื่อสินค้า',pname,'ปริมาณ'))
          osheet.updatevalue('ชื่อสินค้า',pname,'ปริมาณ',osheet.getvalue('ชื่อสินค้า',pname,'ปริมาณ')+1)
        }
      }
      else{
        osheet.sheet.appendRow(trx)
        checkdup = true
      }
    */
    
      /**if(osheet.getvalue('ชื่อสินค้า',pname,'รหัสลูกค้า',custid,'ปริมาณ')){
        osheet.sheet.appendRow(trx)
      }
      else{
        Logger.log(osheet.getvalue('ชื่อสินค้า',pname,'ปริมาณ'))
        osheet.updatevalue('ชื่อสินค้า',pname,'ปริมาณ',osheet.getvalue('ชื่อสินค้า',pname,'ปริมาณ')+1)
      }
      */
    
      //var sheetname = 'ออเดอร์'
      //var osheet = gspandas.gsdataframe(sheeturl,sheetname)
      //osheet.sheet.appendRow(trx)
    }
    
    
    function oldAddorder(oid='111',custid='343',pname='hello',quantity=1) {
      var sheeturl = 'https://docs.google.com/spreadsheets/d/1XgyrIzfcxIbnxb2UmxIzErh9JrxEcHtBBbsj7LQqJKY/edit?usp=sharing'
      var sheetname = 'สินค้า'
      var psheet = gspandas.gsdataframe(sheeturl,sheetname)
      var currentval = parseInt(psheet.getvalue('ชื่อสินค้า',pname,'ปริมาณ'),10)
      psheet.updatevalue('ชื่อสินค้า',pname,'ปริมาณ',currentval-quantity)
      var pinfo = psheet.getrowdict('ชื่อสินค้า',pname)[0]
      var trx = [Date(Date.now()).toString(),oid,custid,pinfo['รหัสสินค้า'],pinfo['ชื่อสินค้า'],pinfo['ราคา'],quantity]
    
    
      var sheetname = 'ออเดอร์'
      var osheet = gspandas.gsdataframe(sheeturl,sheetname)
      osheet.sheet.appendRow(trx)
    }
    
    