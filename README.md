# :mailbox_with_mail:COIN Nokia Digital Suggestion Box 
<img align="right" width="100" height="100" src="https://github.com/Samantha-Zhan/Nokia-COIN-Project-App-/blob/main/COINlogo%5Bmedium%5D.png">
<strong>COIN (Continuous Investment Nokia)</strong> was a cloud-based app development project I independently created during my summer coop at Nokia. It was a task assigned by my manager as an effort to receive constructive feedback from 800+ employees at Nanjing TC site effectively. It was coded with <strong><em>wxml</strong></em>(html) & <strong><em>wxss</strong></em>(css) & <strong><em>Javascript</strong></em> on WeChat App Developer Tool, which is a technology involving a combination of app development and web development supported by WeChat (unfortunately can't be viewed without WeChat, but I have attached small gif demo below). 


#### `Frontend`: WeChat Developer Tool (wxml(html) & wxss(css) & Javascript) 
#### `Backend`: WeChat Cloud Development Tool (WeChat cloud API, cloud function, JSON based could storage)
#### <text style="line-height: 10em;">`Main Features`: :heavy_check_mark:feedback submition (text+image supported),    :heavy_check_mark:user feedbacks,    :heavy_check_mark:community feedbacks,    :heavy_check_mark:user login,    :heavy_check_mark:3 user modes (***user*** / ***administrator*** *<=update feedback process status* / ***super administrator*** *<= visualized app configuration setting*)... and more!!</text>


## Key Highlights
> <strong>Compatibility: </strong> <br>
I choose WeChat Applet for its popularity in my audience (Nanjing site colleagues); they can have access to the app quickly without the need to download <strong>(Andriod and IOS compatiable, can also open on laptop)</strong>. 

> <strong>Efficient use of cloud resouce:</strong> <br>
As an effort to save backend cloud resource during code refinement phase, I successfully reduced the number of storage read requests to <strong><em>20%</em></strong> of original by more efficient request handling, cross-page communication, and increased global data structure.  

> <strong>Drier code with component and cloud function:</strong><br>
I extracted parts of the app and implement these as components for repeated use to **reduce development time** and **catch bugs easier**. For example: list view, detail view of log, user avatar/name display... Moreover, I use cloud function to handle backend database read/write to reduce repetition.

> <strong>Good user experience:</strong> <br>
**easy login** tied to WeChat account, no need for log in after initial sign in and use users' unique openid as identifier; as a suggestion box, I designed the app with **personalized avatar/nickname** at sign in to respect users' expected info exposure; added comprehensible prompt/toasts for user actions (e.g. form submit success/failure at login, feedback, setting); included **community area** to view all feedbacks from other colleagues.

> Respect for user data
> Good user experience: personallized profile+secure user info, easy login, simplistic design, toasts on each action, feedback function, community area
> data visualizing
- User side
- Administrator side

> Progressive update
> Dry code

这是云开发的快速启动指引，其中演示了如何上手使用云开发的三大基础能力：

- 数据库：一个既可在小程序前端操作，也能在云函数中读写的 JSON 文档型数据库
- 文件存储：在小程序前端直接上传/下载云端文件，在云开发控制台可视化管理
- 云函数：在云端运行的代码，微信私有协议天然鉴权，开发者只需编写业务逻辑代码

## 参考文档

- [云开发文档](https://developers.weixin.qq.com/miniprogram/dev/wxcloud/basis/getting-started.html)

