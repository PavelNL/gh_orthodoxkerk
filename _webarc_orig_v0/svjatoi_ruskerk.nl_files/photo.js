<!--
var photoWin = 0;
function display_photo(url, pTitle, wnd_width, wnd_height)
{
  wnd_features = 'menubar=no,location=no,height='+String(wnd_height)+',width='+String(wnd_width)+',resizable=no,scrollbars=no,status=no,toolbar=no';
  //if( photoWin != 0 ) photoWin.window.close();
  photoWin = window.open('', '', wnd_features);
// write content to window
	photoWin.document.write('<html><head><title>' + pTitle + '</title></head>');
	photoWin.document.write('<body BGCOLOR=#000000 marginwidth=0 marginheight=0 topmargin=0 leftmargin=0 rightmargin=0 bottommargin=0>');
	photoWin.document.write('<table width=100% border=0 cellpadding=0 cellspacing=0><tr><td><img ');
	photoWin.document.write('src=\"'+url+'\" width='+wnd_width+' height='+wnd_height+' alt=\"'+pTitle+'\" border=0>');
	photoWin.document.write('</td></tr></table>');
	photoWin.document.write('</body></html>');
	photoWin.document.close();
// If we are on NetScape, we can bring the window to the front
	if (navigator.appName.substring(0,8) == 'Netscape') photoWin.focus();
}

function dp(url, pTitle, wnd_width, wnd_height)
{
  wnd_features = 'menubar=no,location=no,height='+String(wnd_height)+',width='+String(wnd_width)+',resizable=no,scrollbars=no,status=no,toolbar=no';
  //if( photoWin != 0 ) photoWin.window.close();
  photoWin = window.open('', '', wnd_features);
// write content to window
	photoWin.document.write('<html><head><title>' + pTitle + '</title></head>');
	photoWin.document.write('<body BGCOLOR=#000000 marginwidth=0 marginheight=0 topmargin=0 leftmargin=0 rightmargin=0 bottommargin=0>');
	photoWin.document.write('<table width=100% border=0 cellpadding=0 cellspacing=0><tr><td><img ');
	photoWin.document.write('src=\"'+url+'\" width='+wnd_width+' height='+wnd_height+' alt=\"'+pTitle+'\" border=0>');
	photoWin.document.write('</td></tr></table>');
	photoWin.document.write('</body></html>');
	photoWin.document.close();
// If we are on NetScape, we can bring the window to the front
	if (navigator.appName.substring(0,8) == 'Netscape') photoWin.focus();
}

function dph(url, pTitle)
{
  var wnd_width = 550;
  var wnd_height =412;
  wnd_features = 'menubar=no,location=no,height='+String(wnd_height)+',width='+String(wnd_width)+',resizable=no,scrollbars=no,status=no,toolbar=no';
  photoWin = window.open('', '', wnd_features);
// write content to window
	photoWin.document.write('<html><head><title>' + pTitle + '</title></head>');
	photoWin.document.write('<body BGCOLOR=#000000 marginwidth=0 marginheight=0 topmargin=0 leftmargin=0 rightmargin=0 bottommargin=0>');
	photoWin.document.write('<table width=100% border=0 cellpadding=0 cellspacing=0><tr><td><img ');
	photoWin.document.write('src=\"'+url+'\" width='+wnd_width+' height='+wnd_height+' alt=\"'+pTitle+'\" border=0>');
	photoWin.document.write('</td></tr></table>');
	photoWin.document.write('</body></html>');
	photoWin.document.close();
// If we are on NetScape, we can bring the window to the front
	if (navigator.appName.substring(0,8) == 'Netscape') photoWin.focus();
}

function dpv(url, pTitle)
{
  var wnd_width = 412;
  var wnd_height =550;
  wnd_features = 'menubar=no,location=no,height='+String(wnd_height)+',width='+String(wnd_width)+',resizable=no,scrollbars=no,status=no,toolbar=no';
  photoWin = window.open('', '', wnd_features);
// write content to window
	photoWin.document.write('<html><head><title>' + pTitle + '</title></head>');
	photoWin.document.write('<body BGCOLOR=#000000 marginwidth=0 marginheight=0 topmargin=0 leftmargin=0 rightmargin=0 bottommargin=0>');
	photoWin.document.write('<table width=100% border=0 cellpadding=0 cellspacing=0><tr><td><img ');
	photoWin.document.write('src=\"'+url+'\" width='+wnd_width+' height='+wnd_height+' alt=\"'+pTitle+'\" border=0>');
	photoWin.document.write('</td></tr></table>');
	photoWin.document.write('</body></html>');
	photoWin.document.close();
// If we are on NetScape, we can bring the window to the front
	if (navigator.appName.substring(0,8) == 'Netscape') photoWin.focus();
}

var temp, temp2, cookieArray, cookieArray2, cookieCount;
function initiate(){
  cookieCount=0;
  if(document.cookie){
    cookieArray=document.cookie.split(";");
    cookieArray2=new Array();
    for(i in cookieArray){
      cookieArray2[cookieArray[i].split("=")[0].replace(/ /g,"")]=cookieArray[i].split("=")[1].replace(/ /g,"");
    }
  }
  cookieArray=(document.cookie.indexOf("state=")>=0)?cookieArray2["state"].split(","):new Array();
  temp=document.getElementById("containerul");
  for(var o=0;o<temp.getElementsByTagName("li").length;o++){
    if(temp.getElementsByTagName("li")[o].getElementsByTagName("ul").length>0){
      temp2 = document.createElement("span");
      temp2.className = "symbols";
      temp2.style.backgroundImage = (cookieArray.length>0)?((cookieArray[cookieCount]=="true")?"url(minus.png)":"url(plus.png)"):"url(plus.png)";
      temp2.onclick=function(){
        showhide(this.parentNode);
        writeCookie();
      }
      temp.getElementsByTagName("li")[o].insertBefore(temp2,temp.getElementsByTagName("li")[o].firstChild)
      temp.getElementsByTagName("li")[o].getElementsByTagName("ul")[0].style.display = "none";
      if(cookieArray[cookieCount]=="true"){
        showhide(temp.getElementsByTagName("li")[o]);
      }
      cookieCount++;
    }
    else{
      temp2 = document.createElement("span");
      temp2.className = "symbols";
      //sks temp2.style.backgroundImage = "url(page.png)";
      temp.getElementsByTagName("li")[o].insertBefore(temp2,temp.getElementsByTagName("li")[o].firstChild);
    }
  }
}

function showhide(el){
  el.getElementsByTagName("ul")[0].style.display=(el.getElementsByTagName("ul")[0].style.display=="block")?"none":"block";
  el.getElementsByTagName("span")[0].style.backgroundImage=(el.getElementsByTagName("ul")[0].style.display=="block")?"url(minus.png)":"url(plus.png)";
}

function writeCookie(){ // Runs through the menu and puts the "states" of each nested list into an array, the array is then joined together and assigned to a cookie.
  cookieArray=new Array()
  for(var q=0;q<temp.getElementsByTagName("li").length;q++){
    if(temp.getElementsByTagName("li")[q].childNodes.length>0){
      if(temp.getElementsByTagName("li")[q].childNodes[0].nodeName=="SPAN" && temp.getElementsByTagName("li")[q].getElementsByTagName("ul").length>0){
        cookieArray[cookieArray.length]=(temp.getElementsByTagName("li")[q].getElementsByTagName("ul")[0].style.display=="block");
      }
    }
  }
  document.cookie="state="+cookieArray.join(",")+";expires="+new Date(new Date().getTime() + 365*24*60*60*1000).toGMTString();
}


-->
