 var sqsEndPoint = "https://sqs.us-west-2.amazonaws.com/############/";
    var sqsServer = "https://sqs.us-west-2.amazonaws.com";
    var sqsAccountID = "############";
    var sqsQueue1 = "cms_company_info";
    var sqsQueue2 = "hs_alerts";
    var sqsSendAction = "?Action=SendMessage&MessageBody=";
    var sqsRetrieveAction = "?Action=ReceiveMessage&WaitTimeSeconds=10&MaxNumberOfMessages=5&VisibilityTimeout=15&AttributeName=All;";
    var compInfoQueName = "cms_company_info/";
    var alertQueName = "hs_alerts/"
    var hideState = 1;
    var alertText = "";
    var custName = "";
    var custID = "";
    var agName = "";
    var QNV = "QUESTIONS/NEEDS/VALUE";
    var TSS = "TROUBLESHOOTING / SOLUTIONS";
    var OTC = "OUTCOME";
    var CMP = "COMPLETE";
    var CNME = "Caller Name:";
    var zzdelimiter = "ZZZZ";
    var dashdelimiter = "----";
    var noteState = "";
    var rcURL = "https://home-c28.incontact.com/inContact/Default.aspx";
    var adpPWReset = "https://netsecure.adp.com/ilink/pub/smsess/v3/forgot/theme.jsp?returnUrl=https%3A%2F%2Fworkforcenow.adp.com&callingAppId=WFN&totalURL=https://workforcenow.adp.com/workforcenow/login.html";
    var adpPunchIn = "https://workforcenow.adp.com/theme/index.html#/Myself_ttd_MyselfTabTimecardsAttendanceSchCategoryMyTimeEntry/MyselfTabTimecardsAttendanceSchCategoryMyTimeEntry";
    var teamsURL = "https://teams.microsoft.com/l/channel/19%3a53fabf6271be482db0c1a156c86565af%40thread.skype/General?groupId=6002b759-5835-437f-9882-36651d1ef7f9&tenantId=8045f814-2cdc-4e36-af9b-386049dd294f";
    var dualMonSS = "https://www.dualmon.com/account/session";
    var CAR = "https://hawksoftinc.sharepoint.com/SitePages/Customer-at-Risk-Form.aspx";
    var iceURL = "https://ice.ivansinsurance.com/";
    var mmURL = "https://mm.hawksoft.com/hawksoft/channels/a-hawksoftonline";
    var maxURL = "https://max.niceincontact.com/IELandingPage.html";
    var creds = new AWS.Credentials('AKIASULUC27QM7N7FTG2', 'TS1dclfORIkt8sZyM5zWd1GCNpY7x9K1fFarI7JK', '');
    var awsData = "";
    var awsData2 = "";
    AWS.config.update({ region: 'sqs.us-west-2' });
    AWS.config.update({ credentials: creds });
    var sqs = new AWS.SQS({ apiVersion: '2012-11-05' });
    var hsToolUrl = "http://localhost:1337/";
    var popWindowName = "Hawksoft Service Tool";
    var marqueeX = 0;
    var marqueeY = 0;
    var popUpWidth = "500";
    var popUpHeight = "400";
    var statusAlert = " No current issues reported.";
    

    async function main1() {
        var params = {
            QueueUrl: sqsEndPoint + sqsQueue1,
            AttributeNames: ["BODY"],
            MaxNumberOfMessages: '5',
            MessageAttributeNames: [],
            ReceiveRequestAttemptId: "",
            VisibilityTimeout: '15',
            WaitTimeSeconds: '10'
        };

        try {
            const data = await sqs.receiveMessage(params).promise();
            var message = data.Messages[0];
            awsData = message.Body.replace(zzdelimiter, "");

        } catch (err) {
            console.error(err, err.stack);
        };
    }

    async function main2() {
        var params = {
            QueueUrl: sqsEndPoint + sqsQueue2,
            AttributeNames: ["BODY"],
            MaxNumberOfMessages: '5',
            MessageAttributeNames: [],
            ReceiveRequestAttemptId: "",
            VisibilityTimeout: '15',
            WaitTimeSeconds: '10'
        };

        try {
            const data = await sqs.receiveMessage(params).promise();
            var message = data.Messages[0];
            awsData2 = message.Body;

        } catch (err) {
            console.error(err, err.stack);
        };
    }

    function initPage() {

        statusAlert = getStatusAlert();
        setTitle(QNV);
        setIssue2(CNME);
        setMarquee(getTime() + statusAlert);
        setInterval(setMarquee(getTime() + statusAlert), 20000);

    }

    function getStatusAlert() {
        return " No emerging issues reported 812Au.";
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


    function toClipboard(inData) {

        const util = require("util");
        require('child_process').spawn('clip').stdin.end(util.inspect(inData));

    }

    function pushToNote() {

        main1();
        var arrAWSData = parseFloodData(awsData);
        statusAlert = getStatusAlert();
        setCustName(arrAWSData[0]);
        setAgencyName(arrAWSData[1]);
        setCustID(arrAWSData[2]);
        setYAccount(arrAWSData[3]);
        insertTblFloodData(arrAWSData[2], arrAWSData[1], arrAWSData[0], arrAWSData[3]);
        setMarquee(getTime() + statusAlert)
    }

    function getHSAlert() {

        main2();
        setMarquee(getTime() + "----" + awsData2);
        alert(awsData2);
    }

    function getiFrameData() {
        alert("gettingData");
        alert(window.frames[0].document.body.innerHTML);
    }

    function insertTblFloodData(data1, data2, data3, data4) {
        var undefined = document.createTextNode("undefined");
        var sampleText = document.createTextNode(data1);
        //alert(sampleText == undefined);
        tblFloodShow();
        pnlFloodShow();
        if (checkCells(data1)) {
            var table = document.getElementById("tblFlood").getElementsByTagName('tbody')[0];
            var newRow = table.insertRow();
            var newCell1 = newRow.insertCell(0);
            var newText1 = document.createTextNode(data1);
            var newCell2 = newRow.insertCell(1);
            var newText2 = document.createTextNode(data2);
            var newCell3 = newRow.insertCell(2);
            var newText3 = document.createTextNode(data3);
            var newCell4 = newRow.insertCell(3);
            var newText4 = document.createTextNode(data4);
            if (data1 != "undefined") { newCell1.appendChild(newText1); newCell2.appendChild(newText2); newCell3.appendChild(newText3); newCell4.appendChild(newText4); }
            setFldDataGrid();
        }

    }

    function checkCells(data1) {

        var tblClickSet = document.getElementById("tblFlood").getElementsByTagName("td");
        var cellData = "";

        for (var i = 0; i < tblClickSet.length; i++) {
            cellData = tblClickSet[i].innerHTML;
            tblClickSet[i].onClick = function () { alert(cellData); };
            if (cellData == data1) { return false; }
            i++;
        }
        return true;
    }

    function setFldDataGrid() {
        var els = document.getElementById("tblFlood").getElementsByTagName("tr");

        for (var i = 0; i < els.length; i++) {
            els[i].style.background = "grey";
            els[i + 1].style.background = "none";
            els[i + 1].style.color = "white";
            i++;
        }

    }

    function highlight_row() {
        var table = document.getElementById('tblFlood');
        var cells = table.getElementsByTagName('td');

        for (var i = 0; i < cells.length; i++) {

            var cell = cells[i];

            cell.onclick = function () {

                var rowId = this.parentNode.rowIndex;

                var rowsNotSelected = table.getElementsByTagName('tr');
                for (var row = 0; row < rowsNotSelected.length; row++) {
                    rowsNotSelected[row].style.backgroundColor = "grey";
                    rowsNotSelected[row].style.color = "white";
                    rowsNotSelected[row].classList.remove('selected');
                }
                var rowSelected = table.getElementsByTagName('tr')[rowId];
                rowSelected.style.backgroundColor = "lightyellow";
                rowSelected.style.color = "black";
                rowSelected.className += " selected";

                setPVI(rowSelected.cells[2].innerHTML, rowSelected.cells[1].innerHTML, rowSelected.cells[0].innerHTML, rowSelected.cells[3].innerHTML);
            }
        }

    }

    function ssInit() {
        iframeShowHide(dualMonSS)
        webPopup(dualMonSS, "SS", popUpWidth, popUpHeight, "100", "100");
    }

    function iceInit() {
        webPopup(iceURL, "ICE", popUpWidth, popUpHeight, "100", "100");
    }

    function teamInit() {
        webPopup(teamsURL, "TEAMS", popUpWidth, popUpHeight, "100", "100");
    }

    function rcInit() {
        webPopup(rcURL, "RingCentral", popUpWidth, popUpHeight, "100", "100");
    }

    function mmInit() {
        webPopup(mmURL, "MM", popUpWidth, popUpHeight, "100", "100");
    }

    function maxInit() {
        webPopup(maxURL, "MAX", popUpWidth, popUpHeight, "100", "100");
    }

    function windowResize(width, height) {
        window.resizeTo(width, height);
    }

    function arrBackAction() {
        windowResize(713, 566);
        issue2Resize(647, 275);
    }

    function moveWindow() {
        posX = event.screenX - (0 / 0);
        posY = event.screenY - (0 / 0);
        window.moveTo(posX, posY);
    }

    function compAct() { windowResize(335, 235); }
    function expAnd() { windowResize(713, 566); }
    function moveLeft() { moveWindow(); }
    function moveRight() { }
    function moveUp() { }
    function moveDown() { }


    function webPopup(url, windowname, w, h, x, y) { window.open(url, windowname, "resizable=no,toolbar=no,scrollbars=no,menubar=no,status=no,directories=n o,width=" + popUpWidth + ",height=" + popUpHeight + ",left=" + x + ",top=" + y); }

    function myPopup(url, windowname, w, h, x, y) {
        window.open(url, windowname, "resizable=no,toolbar=no,scrollbars=no,menubar=no,status=no,directories=n o,width=" + w + ",height=" + h + ",left=" + x + ",top=" + y);
    }

    function thisPop() { myPopup("http://localhost:1337/", popWindowName, "695", "502", "100", "100"); }

    function floodFField() {
        var doc = document.getElementById("RemoteData");
        var innerH = doc.contentWindow.document.body.innerHTML;
        alert(innerH);
    }

    function parseFloodData(inData) {

        var arrData = inData.replace(zzdelimiter, "").split(dashdelimiter);
        return arrData;

    }

    function runAlertPoll() {
        var arrXML;
        var remDataText;
        remDataText = getAlert();
        arrXML = remDataText.split(zzdelimiter);
        return arrXML[1];
    }

    function alertThis() {
        alert(goog);
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

    function pushToAlert() {
        alertText = document.getElementById("txtPreview").value;
        var pushPhrase = sqsEndPoint + alertQueName + sqsSendAction + "ZZZZ" + alertText + "ZZZZ";
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
        iframeShowHide(teamsGeneral); ringcentral
    }

    function evalKeyStroke(event) {

        custName = getCustName();
        custID = getCustID();
        agName = getAgencyName();
        var custAgID = custName + " / " + agName + " #" + custID;
        var custAgIDTitle = "Customer / Agency";
        custAgIDTitle += "\n"
        custAgIDTitle += custAgID;
        if (event.keyCode == 13) { enterKeyEval(getIssue2(), getTitle()); }
        if (event.keyCode == 10) { concatTxtPreview(custAgIDTitle); }

    }

    function enterKeyEval(issue2, title) {

        if (title = QNV) {

            var issSplit = issue2.split("\n");
            issSplit.forEach(function (item, index) { if (item.includes(CNME)) { getCNME(item); setIssue2(""); }; })

        }

    }

    function getCNME(cname) {

        custName = cname.replace(CNME, "").split("\n")[0];
        setCallerName(custName);

    }

    function concatTxtPreview(custAgIDTitle) {

        var txtPreviewStr = getTxtPreview();
        postIssueText(txtPreviewStr, custAgIDTitle)
        evalNoteState(getTitle());
        setIssue2("");

    }

    function postIssueText(txtPreviewStr, custAgIDTitle) {

        var title = getTitle();
        if (title != OTC) {
            if (txtPreviewStr.length >= 2) { txtPreviewStr += "\n" + "\n"; }
            else { setTxtPreview(""); }
            txtPreviewStr += getTitle();
            txtPreviewStr += "\n" + "\n";
            txtPreviewStr += getIssue2();
        }
        else { txtPreviewStr = custAgIDTitle + "\n" + txtPreviewStr + "\n" + "\n" + getTitle() + "\n" + "\n" + getIssue2(); }
        setTxtPreview(txtPreviewStr);
        if (getTitle() == OTC) { navigator.clipboard.writeText(getTxtPreview());}
    }

    function evalNoteState(inNoteState) {

        if (inNoteState == CMP) { noteState = QNV; setTitle(QNV); setIssue2(CNME); return QNV; }
        if (inNoteState == QNV) { noteState = TSS; setTitle(TSS); return TSS; }
        if (inNoteState == TSS) { noteState = OTC; setTitle(OTC); return OTC; }
        if (inNoteState == OTC) { noteState = CMP; setTitle(CMP); return CMP; }

    }

    function evalTblItems(txtPrev) {
        var table = document.getElementById('tblFlood');
        var rows = table.getElementsByTagName('tr');
        var cells = table.getElementsByTagName('td');

        for (var i = 0; i < rows.length; i++) {
            alert(rows[i].cells[0].value);
            if (rows[i].cells[0].value = getCustID()) {
                var newCell5 = rows[i].insertCell(4);
                var newText5 = document.createTextNode(getTxtPreview());
                newCell5.appendChild(newText5);
            }
        }
    }

    function showHideFloodField(state) {

        if (state = 1) { document.getElementById("floodField").style.visibility = "visible"; }
        else { document.getElementById("floodField").style.visibility = "hidden"; }
    }

    function agNameDBClick() {

        var curCustName = getCustName();
        setCustName(getCallerName());
        if (getTxtPreview().includes(curCustName)) { setTxtPreview(getTxtPreview().replace(curCustName, getCallerName())); }

    }

    function userNameOutPut() {

        var choice = getUserNameAction();
        var requestBody = "Have auth. Please reset password.";
        var cname = getAgencyName();
        var username = getUserName();
        var cid = getCustID();
        var server = getServer();
        var iss2Value = getIssue2();
        if (choice == 2) { requestBody = "Have auth. Please reset all connections."; }
        if (choice == 3) { requestBody = "Would like to have their username, " + username + ", released and possibly reset their password."; }
        if (choice == 4) { requestBody = "Cant open PST/OST file, getting this error:"; }
        var output = iss2Value + "\r\n" +
            "@channel" + "\r\n" +
            "CName:" + cname + "\r\n" +
            "CID:" + cid + "\r\n" +
            "UserID:" + username + "\r\n" +
            "Server:" + server + "\r\n" +
            requestBody;

        setIssue2(output);
        setUserNameAction(0);
    }

    function userNameAction() {

        document.getElementById("userNameAction").style.visibility = "visible";

    }

    function userNameApplyChoice() {

        document.getElementById("userNameAction").style.visibility = "hidden";
        userNameOutPut();
    }

    function clearPVI() {

        setCustName("");
        setCustID("");
        setAgencyName("");
        setTitle(QNV);
        setTxtPreview("");
        setYAccount("");
        setUserName("");
        setServer("");
        setIssue2(CNME);

    }

    function setPVI(cnme, anme, cid, yacct) {
        setCustName(cnme);
        setAgencyName(anme);
        setCustID(cid);
        setYAccount(yacct);
    }

    function tblFloodShowAction() {
        tblFloodShow();
        setFldDataGrid();
    }

    function tblFloodHideAction() {
        tblFloodHide();
        pnlFloodHide();
    }

    function pnlFloodShow() { document.getElementById("pnlFlood").style.visibility = "visible"; }
    function pnlFloodHide() { document.getElementById("pnlFlood").style.visibility = "hidden"; }

    function tblFloodShow() { pnlFloodShow(); document.getElementById("tblFlood").style.visibility = "visible"; }
    function tblFloodHide() { document.getElementById("tblFlood").style.visibility = "hidden"; }

    function txtPreviewResize(x, y) { document.getElementById("txtPreview").style.width = x + "px"; document.getElementById("txtPreview").style.height = y + "px"; }

    function issue2Resize(x, y) { document.getElementById("issue2").style.width = x + "px"; document.getElementById("issue2").style.height = y + "px"; }

    function setNoteState(inNoteState) { alert(inNoteState); noteState = inNoteState; }

    function setMarquee(inText) { document.getElementById("txtMarquee").innerHTML = inText; }

    function getCustName() { return document.getElementById("Customer").value; }
    function setCustName(inCustName) { document.getElementById("Customer").value = inCustName; }

    function getCustID() { return document.getElementById("agencyID").value; }
    function setCustID(inCustID) { document.getElementById("agencyID").value = inCustID; }

    function getYAccount() { return document.getElementById("yAccount").value; }
    function setYAccount(inYAccount) { document.getElementById("yAccount").value = inYAccount; }

    function getAgencyName() { return document.getElementById("agencyName").value; }
    function setAgencyName(inAgName) { document.getElementById("agencyName").value = inAgName; }

    function getTitle() { return document.getElementById("lblTitle").value; }
    function setTitle(inTitle) { document.getElementById("lblTitle").value = inTitle; }

    function getIssue2() { return document.getElementById("issue2").value; }
    function setIssue2(issue2Val) { document.getElementById("issue2").value = issue2Val; }

    function getTxtPreview() { return document.getElementById("txtPreview").value; }
    function setTxtPreview(txtPreviewVal) { document.getElementById("txtPreview").value = txtPreviewVal; }

    function getFloodField() { return document.getElementById("floodField").value; }
    function setFloodField(txtPreviewVal) { document.getElementById("floodField").value = txtPreviewVal; }

    function getRemoteData() { return document.getElementById("RemoteData").contentWindow.document.body.innerHTML; }

    function getCallerName() { return document.getElementById("callerName").value; }
    function setCallerName(callerName) { document.getElementById("callerName").value = callerName; }

    function getUserName() { return document.getElementById("userName").value; }
    function setUserName(userName) { document.getElementById("userName").value = userName; }

    function getServer() { return document.getElementById("server").value; }
    function setServer(server) { document.getElementById("server").value = server; }

    function getUserNameAction() { return document.getElementById("userNameAction").value; }
    function setUserNameAction(userNameAction) { document.getElementById("userNameAction").value = userNameAction; }
