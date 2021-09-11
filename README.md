# :mailbox_with_mail:COIN Nokia Digital Suggestion Box 
<img align="right" width="100" height="100" src="https://github.com/Samantha-Zhan/Nokia-COIN-Project-App-/blob/main/COINlogo%5Bmedium%5D.png">
<strong>COIN (Continuous Investment Nokia)</strong> was a cloud-based app development project I independently created during my summer coop at Nokia. It was a task assigned by my manager to receive constructive feedback from 800+ employees at the Nanjing TC site effectively. It was coded with <strong><em>wxml</strong></em>(html) & <strong><em>wxss</strong></em>(css) & <strong><em>Javascript</strong></em> on WeChat App Developer Tool, which is a technology involving a combination of app development and web development supported by WeChat (unfortunately can't be viewed without WeChat, but I have attached small gif demo below). 


#### `Frontend`: WeChat Developer Tool (wxml(html) & wxss(css) & Javascript) 
#### `Backend`: WeChat Cloud Development Tool (WeChat cloud API, cloud function, JSON based could storage)
#### <text style="line-height: 10em;">`Main Features`: :heavy_check_mark:feedback submission (text+image supported),    :heavy_check_mark:user feedbacks,    :heavy_check_mark:community feedbacks,    :heavy_check_mark:user login,    :heavy_check_mark:3 user modes (***user*** / ***administrator*** *<=update feedback process status* / ***super administrator*** *<= visualized app configuration setting*)... and more!!</text>


## Key Highlights & Feature Demo
> :small_blue_diamond:  <strong>Compatibility: </strong> <br>
I choose WeChat Applet for its popularity in my audience (Nanjing site colleagues); they can access the app quickly without downloading it <strong>(Andriod and IOS compatible, can also open on laptop)</strong>. 

> :small_blue_diamond:  <strong>Efficient use of cloud resources:</strong> <br>
As an effort to save backend cloud resources during the code refinement phase, I successfully reduced the number of storage read requests to <strong><em>20%</em></strong> of original by more efficient request handling, cross-page communication, and increased global data structure.  

> :small_blue_diamond:  <strong>Drier code with component and cloud function:</strong><br>
I extracted parts of the app and implement these as components for repeated use to **reduce development time** and **catch bugs easier**. For example: list view, detail view of log, user avatar/name display... Moreover, I use cloud function to handle backend database read/write to reduce repetition.

> :small_blue_diamond:  <strong>Good user experience:</strong> <br>
**Easy login** tied to WeChat account, no need for login after initial sign up and use users' unique OpenID as an identifier. In addition, as a suggestion box, it allows **personalized avatar/nickname** at sign up to protect user privacy. Moreover, I added **comprehensible prompt/toasts** for user actions (e.g. form submit success/failure at login, feedback, setting). The **community area** is also included to view all feedback from other colleagues.<br><br>

Launch Page (as normal user)             |  Sign Up (as administrator)  |  Submit Feedback
:-------------------------:|:-------------------------:|:-------------------------:
<img src="https://user-images.githubusercontent.com/40647818/131355041-f464b44c-7fa6-483c-a814-4fe91306b3a3.gif" width="236.8" height="512"> |  <img src="https://user-images.githubusercontent.com/40647818/131355237-9d547116-f986-45b5-9f8e-d5e99d54e8ab.gif" width="236.8" height="512">  |  <img src="https://user-images.githubusercontent.com/40647818/131355434-dc0a9f5c-c8e6-4910-be32-76257c4fa046.gif" width="236.8" height="512">
View All Feedback     |    View Feedback Detail With Image |  View Feedback Detail Without Image
<img src="https://user-images.githubusercontent.com/40647818/131356551-86d3e041-111c-451f-8f1c-e2b99fec925f.gif" width="236.8" height="512"> |  <img src="https://user-images.githubusercontent.com/40647818/131356619-825958cb-ca4e-4cf6-94b4-da81690dadbf.gif" width="236.8" height="512">  |  <img src="https://user-images.githubusercontent.com/40647818/131356346-f48650b6-fc02-4064-819e-b01447bfdef5.gif" width="236.8" height="512">


> :small_blue_diamond:  <strong>Customized Server-Side Datatable Visualizer:</strong> <br>
I designed a very simple workaround for **server-side data alteration for administrator** by adding administrator code at log in and created add-ons/pages for identified administrator after login, so that they can review/change status of submitted suggestions, change feedback form categories, change administrator code, and add/remove administrators.<br><br>

Administrator Change Feedback Status            |  Super Administrator's App Config Page 
:-------------------------:|:-------------------------:
<img src="https://user-images.githubusercontent.com/40647818/131357689-68e052c0-d9eb-429a-9c97-9338a74470ad.gif" width="236.8" height="512"> |  <img src="https://user-images.githubusercontent.com/40647818/131357738-fb7b891d-0907-4d82-bacc-af32278a6d17.gif" width="236.8" height="512">
Setting Detail: Change Feedback Category            |  Setting Detail: Lookup/Add/Remove Administrator
<img src="https://user-images.githubusercontent.com/40647818/131359316-e4ef8343-3ab3-4471-8129-ad72a943e5d5.gif" width="236.8" height="512"> |  <img src="https://user-images.githubusercontent.com/40647818/131360497-39b23793-065a-4128-896d-6057d1d79f71.gif" width="236.8" height="512">





