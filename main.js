    var sqsEndPoint = "https://sqs.us-west-2.amazonaws.com/############/";
    var compInfoQueName = "cms_company_info/";
    var alertQueName = "hs_alerts/"
    var sqsSendAction = "?Action=SendMessage&MessageBody=";
    var sqsRetrieveAction = "?Action=ReceiveMessage&WaitTimeSeconds=10&MaxNumberOfMessages=5&VisibilityTimeout=15&AttributeName=All;";
    var hideState = 1;
    var alertText = "";
    var QNV = "QUESTIONS/NEEDS/VALUE";
    var TSS = "TROUBLESHOOTING / SOLUTIONS";
    var OTC = "OUTCOME";
    var adpPWReset = "https://netsecure.adp.com/ilink/pub/smsess/v3/forgot/theme.jsp?returnUrl=https%3A%2F%2Fworkforcenow.adp.com&callingAppId=WFN&totalURL=https://workforcenow.adp.com/workforcenow/login.html";
    var adpPunchIn = "https://workforcenow.adp.com/theme/index.html#/Myself_ttd_MyselfTabTimecardsAttendanceSchCategoryMyTimeEntry/MyselfTabTimecardsAttendanceSchCategoryMyTimeEntry";
    var teamsGeneral = "https://teams.microsoft.com/l/channel/19%3a53fabf6271be482db0c1a156c86565af%40thread.skype/General?groupId=6002b759-5835-437f-9882-36651d1ef7f9&tenantId=8045f814-2cdc-4e36-af9b-386049dd294f";

    function initPage() {
        document.getElementById("lblTitle").value = QNV;
        document.getElementById("txtMarquee").innerHTML = getTime();
    }

    function getTime() {

        var theTime = new Date();
        return theTime;
    }

    var starMoving;
    var posX;
    var posY;
    var isMoving = false;
    function setPos() {
        posX = event.screenX - (60 / 2);
        posY = event.screenY - (10 / 2);
        if (isMoving == true) { window.moveTo(posX, posY); }
    }
    function moving() { isMoving = true; }
    function stopMoving() { isMoving = false; }

    function pushToNote() {
        var apiPhrase = sqsEndPoint + compInfoQueName + sqsRetrieveAction; /* + document.getElementById("Customer").value + "," + document.getElementById("AgencyName").value + "," + document.getElementById("AgencyID").value;*/
        iframeShowHide(apiPhrase);
        document.getElementById("btnCloseiFrame").style.visibility = "visible";
        document.getElementById("txtPreview").style.visibility = "hidden";
    }

    function runAlertPoll() {
        var arrXML;
        var remDataText;
        remDataText = getAlert();
        arrXML = remDataText.split("ZZZZ");
        return arrXML[1];
    }

    function alertThis() {
        return "I AM THE CUCUDADA!!!";
    }

    function getAlert() {
        var apiPhrase = sqsEndPoint + alertQueName + sqsRetrieveAction;
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open("GET", apiPhrase, false); // false for synchronous request
        xmlHttp.send(null);
        return xmlHttp.responseText;
    }

    function iframeShowHide(apiPhrase) {
        if (hideState = 1) {
            document.getElementById("RemoteData").style.visibility = "visible";
            document.getElementById("RemoteData").src = apiPhrase;
            hideState = 0;
        }
        else { }
    }

    function parseJsonMessage(inJson) {
        var clientInfo = JSON.parse(inJson);
        document.getElementById("RemoteData").style.visibility = "hidden";
    }


    function parseXMLMessage(inXML) {
        /*
            var  parser, xmlDoc;
            parser = new DOMParser();
            xmlDoc = parser.parseFromString(inXML,"text/xml");
            xmlDoc.getElementsByTagName("Body")[0].childNodes[0].nodeValue;
        */
        var arrXML
        var arrBody
        var remDataText = document.getElementById("RemoteData").contentWindow.document.body.innerHTML;

        document.getElementById("txtPreview").style.visibility = "visible";
        document.getElementById("RemoteData").style.visibility = "hidden";
        document.getElementById("btnCloseiFrame").style.visibility = "hidden";
        arrXML = remDataText.split("ZZZZ");
        arrBody = arrXML[1].split("----");
        if (document.getElementById("Customer").value.length < 2) { document.getElementById("Customer").value = arrBody[0]; }
        document.getElementById("AgencyName").value = arrBody[1];
        document.getElementById("AgencyID").value = arrBody[2];
    }

    function pushToAlert() {
        alertText = document.getElementById("txtPreview").value;
        var pushPhrase = sqsEndPoint + alertQueName + sqsSendAction + "ZZZZ" + alertText + "ZZZZ";
        //document.getElementById("RemoteData").style.visibility = "visible";
        document.getElementById("RemoteData").src = pushPhrase;
        alert(alertText + "has been sent to alerts.");
    }

    function getAgentsState() {
        var getAgentsStatePayload = {
            'updatedSince': 'string - ISO 8601 formatted date/time',
            'fields': 'string'
        }
        $.ajax({
            //The baseURI variable is created by the result.base_server_base_uri,
            //which is returned when getting a token and should be used to create the URL base
            'url': baseURI + 'services/{version}/agents/states',
            'type': 'GET',
            'headers': {
                //Use access_token previously retrieved from inContact token service
                'Authorization': 'bearer ' + accessToken,
                'content-Type': 'application/x-www-form-urlencoded'
            },
            'data': getAgentsStatePayload,
            'success': function (result, status, statusCode) {
                //Process success actions
                return result;
            },
            'error': function (XMLHttpRequest, textStatus, errorThrown) {
                //Process error actions
                //Process error actions
                return false;
            }
        });
    }

    function agentState() {
        alert("fig fists");
        iframeShowHide(teamsGeneral);
    }

    function evalKeyStroke(event) {

            if (event.keyCode == 10) {
                concatTxtPreview();
            }

    }

    function concatTxtPreview() {

        var txtPreviewStr = document.getElementById("txtPreview").value;
        if (txtPreviewStr.length > 2) { txtPreviewStr += "\n" + "\n"; }
        txtPreviewStr += document.getElementById("issue2").value;
        setTxtPreview(txtPreviewStr);
        setIssue2("");
    }

    function setIssue2(issue2Val) {

        document.getElementById("issue2").value = issue2Val;
    }

    function setTxtPreview(txtPreviewVal) {

        document.getElementById("txtPreview").value = txtPreviewVal;

    }
