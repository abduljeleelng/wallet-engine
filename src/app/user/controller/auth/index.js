const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");
require('dotenv').config();
const models = require('../../../../models');
const {mainEmail} = require('../../middlewares/helper')
const users = require('../../../../services')

function hash(i){
    return i*2654435761 % (10000)
}

exports.create = async (req, res)=>{
    // #swagger.tags = ['User Authentication']
    // #swagger.summary = 'Create new user'
    // #swagger.description = 'Endpoint used to create a new user.'
    try {
        const {email, phone, password } = req.body
        const user = await models.User.findOne({where:{
            [Op.or]: [
            { email},
            { phone}
          ]}})
        if(user){
            return res.status(423).json({error:"Your account already exist, you login to your account", data:user})
        }
        const token = hash(new Date())
        const payload = {email, password,phone, token}
        const data = await models.User.create(payload)
        if(!data){
            return res.status(400).json({error:"server error in creating user account ",})
        }
        const AccountCreation = {
            from : "support@wallet-engine.org",
            to:data.email,
            replyTo:"support@wallet-engine.org",
            subject: "Registration | Activation code",
            html:`
            <!DOCTYPE html>
            <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en"><head>
            <title> Welcome to Wallet Engine  </title>
            <!--[if !mso]><!-- -->
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <!--<![endif]-->
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <style type="text/css">
                #outlook a {
                padding: 0;
                }
    
                body {
                margin: 0;
                padding: 0;
                -webkit-text-size-adjust: 100%;
                -ms-text-size-adjust: 100%;
                }
    
                table,
                td {
                border-collapse: collapse;
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                }
    
                img {
                border: 0;
                height: auto;
                line-height: 100%;
                outline: none;
                text-decoration: none;
                -ms-interpolation-mode: bicubic;
                }
    
                p {
                display: block;
                margin: 13px 0;
                }
            </style>
            <!--[if mso]>
                    <xml>
                    <o:OfficeDocumentSettings>
                    <o:AllowPNG/>
                    <o:PixelsPerInch>96</o:PixelsPerInch>
                    </o:OfficeDocumentSettings>
                    </xml>
                    <![endif]-->
            <!--[if lte mso 11]>
                    <style type="text/css">
                    .mj-outlook-group-fix { width:100% !important; }
                    </style>
                    <![endif]-->
            <!--[if !mso]><!-->
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500&amp;display=swap" rel="stylesheet" type="text/css" />
            <style type="text/css">
                @import url(https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500&amp;display=swap);
            </style>
            <!--<![endif]-->
            <style type="text/css">
                @media only screen and (min-width:480px) {
                .mj-column-per-100 {
                    width: 100% !important;
                    max-width: 100%;
                }
                }
            </style>
            <style type="text/css">
                @media only screen and (max-width:480px) {
                table.mj-full-width-mobile {
                    width: 100% !important;
                }
    
                td.mj-full-width-mobile {
                    width: auto !important;
                }
                }
            </style>
            <style type="text/css">
                a,
                span,
                td,
                th {
                -webkit-font-smoothing: antialiased !important;
                -moz-osx-font-smoothing: grayscale !important;
                }
            </style>
            </head>
    
            <body style="background-color:#F4F5FB;" data-new-gr-c-s-check-loaded="8.884.0" data-gr-ext-installed="">
            <div style="display:none;font-size:1px;color:#ffffff;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">
             Preview - Welcome to Wallet Engine  </div>
            <div style="background-color:#F4F5FB;">
                <!--[if mso | IE]>
                <table
                    align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
                >
                    <tr>
                    <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                <![endif]-->
                <div style="margin:0px auto;max-width:600px;">
                <table role="presentation" style="width:100%;" cellspacing="0" cellpadding="0" border="0" align="center">
                    <tbody>
                    <tr>
                        <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
                        <!--[if mso | IE]>
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                            
                    <tr>
                
                        <td
                        class="" style="vertical-align:top;width:600px;"
                        >
                    <![endif]-->
                        <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                            <table role="presentation" style="vertical-align:top;" width="100%" cellspacing="0" cellpadding="0" border="0">
                            <tbody><tr>
                                <td style="font-size:0px;word-break:break-word;">
                                <!--[if mso | IE]>
                
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td height="5" style="vertical-align:top;height:5px;">
                
                <![endif]-->
                                <div style="height:5px;">   </div>
                                <!--[if mso | IE]>
                
                    </td></tr></table>
                
                <![endif]-->
                                </td>
                            </tr>
                            </tbody></table>
                        </div>
                        <!--[if mso | IE]>
                        </td>
                    
                    </tr>
                
                            </table>
                            <![endif]-->
                        </td>
                    </tr>
                    </tbody>
                </table>
                </div>
                <!--[if mso | IE]>
                    </td>
                    </tr>
                </table>
                
                <table
                    align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
                >
                    <tr>
                    <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                
                    <v:rect  style="width:600px;" xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false">
                    <v:fill  origin="0.5, 0" position="0.5, 0" src="https://images.unsplash.com/photo-1494253109108-2e30c049369b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80" type="tile" />
                    <v:textbox style="mso-fit-shape-to-text:true" inset="0,0,0,0">
                <![endif]-->
                <div style="background:url(https://images.unsplash.com/photo-1494253109108-2e30c049369b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=600&amp;q=80) top center / auto no-repeat;margin:0px auto;border-radius:20px;max-width:600px;">
                <div style="line-height:0;font-size:0;">
                    <table role="presentation" style="background:url(https://images.unsplash.com/photo-1494253109108-2e30c049369b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=600&amp;q=80) top center / auto no-repeat;width:100%;border-radius:20px;" cellspacing="0" cellpadding="0" border="0" background="https://images.unsplash.com/photo-1494253109108-2e30c049369b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=600&amp;q=80" align="center">
                    <tbody>
                        <tr>
                        <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
                            <!--[if mso | IE]>
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                            
                    <tr>
                
                        <td
                        class="" style="vertical-align:top;width:600px;"
                        >
                    <![endif]-->
                            <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                            <table role="presentation" style="vertical-align:top;" width="100%" cellspacing="0" cellpadding="0" border="0">
                                <tbody><tr>
                                <td style="font-size:0px;padding:8px 0;word-break:break-word;" align="center">
                                    <table role="presentation" style="border-collapse:collapse;border-spacing:0px;" cellspacing="0" cellpadding="0" border="0">
                                    <tbody>
                                        <tr>
                                        <td style="width:150px;">
                                            <img src="${process.env.CLIENT_URL}/logo.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="150" height="auto" />
                                        </td>
                                        </tr>
                                    </tbody>
                                    </table>
                                </td>
                                </tr>
                                <tr>
                                <td style="font-size:0px;word-break:break-word;">
                                    <!--[if mso | IE]>
                
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td height="250" style="vertical-align:top;height:250px;">
                
                <![endif]-->
                                    <div style="height:250px;">   </div>
                                    <!--[if mso | IE]>
                
                    </td></tr></table>
                
                <![endif]-->
                                </td>
                                </tr>
                            </tbody></table>
                            </div>
                            <!--[if mso | IE]>
                        </td>
                    
                    </tr>
                
                            </table>
                            <![endif]-->
                        </td>
                        </tr>
                    </tbody>
                    </table>
                </div>
                </div>
                <!--[if mso | IE]>
                    </v:textbox>
                </v:rect>
                
                    </td>
                    </tr>
                </table>
                
                <table
                    align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
                >
                    <tr>
                    <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                <![endif]-->
                <div style="background:#F4F5FB;background-color:#F4F5FB;margin:0px auto;max-width:600px;">
                <table role="presentation" style="background:#F4F5FB;background-color:#F4F5FB;width:100%;" cellspacing="0" cellpadding="0" border="0" align="center">
                    <tbody>
                    <tr>
                        <td style="direction:ltr;font-size:0px;padding:15px;text-align:center;">
                        <!--[if mso | IE]>
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                            
                    <tr>
                
                        <td
                        class="" style="vertical-align:top;width:570px;"
                        >
                    <![endif]-->
                        <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                            <table role="presentation" style="vertical-align:top;" width="100%" cellspacing="0" cellpadding="0" border="0">
                            </table>
                        </div>
                        <!--[if mso | IE]>
                        </td>
                    
                    </tr>
                
                            </table>
                            <![endif]-->
                        </td>
                    </tr>
                    </tbody>
                </table>
                </div>
                <!--[if mso | IE]>
                    </td>
                    </tr>
                </table>
                
                <table
                    align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
                >
                    <tr>
                    <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                <![endif]-->
                <div style="background:#ffffff;background-color:#ffffff;margin:0px auto;border-radius:20px;max-width:600px;">
                <table role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;border-radius:20px;" cellspacing="0" cellpadding="0" border="0" align="center">
                    <tbody>
                    <tr>
                        <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
                        <!--[if mso | IE]>
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                            
                    <tr>
                
                        <td
                        class="" style="vertical-align:top;width:600px;"
                        >
                    <![endif]-->
                        <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                            <table role="presentation" style="vertical-align:top;" width="100%" cellspacing="0" cellpadding="0" border="0">
                            <tbody><tr>
                                <td style="font-size:0px;padding:10px 25px;word-break:break-word;" align="left">
                                <div style="font-family:Montserrat, Helvetica, Arial, sans-serif;font-size:20px;font-weight:500;line-height:30px;text-align:left;color:#8189A9;">
                                Welcome to Wallet Engine 
                                </div>
                                </td>
                            </tr>
                            <tr>
                                <td style="font-size:0px;padding:10px 25px;word-break:break-word;" align="left">
                                <div style="font-family:Montserrat, Helvetica, Arial, sans-serif;font-size:16px;font-weight:400;line-height:20px;text-align:left;color:#8189A9;">
                                Thanks for your time to take the registration <br />
                                Use this activation code to activate your account <a href="#" style="color: #0078be; text-decoration: none; font-weight: 500;">${data.token}</a>. 
                                Once you have completed the process, you will start using our service.</div>
                                </td>
                            </tr>
                            <tr>
                                <td vertical-align="middle" style="font-size:0px;padding:10px 25px;word-break:break-word;" align="left">
                                <table role="presentation" style="border-collapse:separate;line-height:100%;" cellspacing="0" cellpadding="0" border="0">
                                    <tbody><tr>
                                    <td role="presentation" style="border:none;border-radius:3px;cursor:auto;mso-padding-alt:10px 25px;background:#0078be;" valign="middle" bgcolor="#0078be" align="center">
                                        <a href="#" style="display: inline-block; background: #0078be; color: #ffffff; font-family: Montserrat, Helvetica, Arial, sans-serif; font-size: 15px; font-weight: 500; line-height: 24px; margin: 0; text-decoration: none; text-transform: none; padding: 10px 25px; mso-padding-alt: 0px; border-radius: 3px;">
                                         ${data.token} </a>
                                    </td>
                                    </tr>
                                </tbody></table>
                                </td>
                            </tr>
                            <tr>
                                <td style="font-size:0px;padding:10px 25px;word-break:break-word;" align="left">
                                <div style="font-family:Montserrat, Helvetica, Arial, sans-serif;font-size:16px;font-weight:400;line-height:20px;text-align:left;color:#8189A9;">If you have any questions simply reply to this email and we would be more than happy to reply. :)</div>
                                </td>
                            </tr>
                            </tbody></table>
                        </div>
                        <!--[if mso | IE]>
                        </td>
                    
                    </tr>
                
                            </table>
                            <![endif]-->
                        </td>
                    </tr>
                    </tbody>
                </table>
                </div>
                <!--[if mso | IE]>
                    </td>
                    </tr>
                </table>
                
                <table
                    align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
                >
                    <tr>
                    <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                <![endif]-->
                <div style="background:#F4F5FB;background-color:#F4F5FB;margin:0px auto;max-width:600px;">
                <table role="presentation" style="background:#F4F5FB;background-color:#F4F5FB;width:100%;" cellspacing="0" cellpadding="0" border="0" align="center">
                    <tbody>
                    <tr>
                        <td style="direction:ltr;font-size:0px;padding:15px;text-align:center;">
                        <!--[if mso | IE]>
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                            
                    <tr>
                
                        <td
                        class="" style="vertical-align:top;width:570px;"
                        >
                    <![endif]-->
                        <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                            <table role="presentation" style="vertical-align:top;" width="100%" cellspacing="0" cellpadding="0" border="0">
                            </table>
                        </div>
                        <!--[if mso | IE]>
                        </td>
                    
                    </tr>
                
                            </table>
                            <![endif]-->
                        </td>
                    </tr>
                    </tbody>
                </table>
                </div>
                <!--[if mso | IE]>
                    </td>
                    </tr>
                </table>
                
                <table
                    align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
                >
                    <tr>
                    <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                <![endif]-->
                <div style="background:#edeef6;background-color:#edeef6;margin:0px auto;border-radius:20px;max-width:600px;">
                <table role="presentation" style="background:#edeef6;background-color:#edeef6;width:100%;border-radius:20px;" cellspacing="0" cellpadding="0" border="0" align="center">
                    <tbody>
                    <tr>
                        <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
                        <!--[if mso | IE]>
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                            
                    <tr>
                
                        <td
                        class="" style="vertical-align:top;width:600px;"
                        >
                    <![endif]-->
                        <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                            <table role="presentation" style="vertical-align:top;" width="100%" cellspacing="0" cellpadding="0" border="0">
                            <tbody><tr>
                                <td style="font-size:0px;padding:10px 25px;word-break:break-word;" align="center">
                                <!--[if mso | IE]>
                <table
                    align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                >
                    <tr>
                
                        <td>
                        <![endif]-->
                                <table role="presentation" style="float:none;display:inline-table;" cellspacing="0" cellpadding="0" border="0" align="center">
                                    <tbody><tr>
                                    <td style="padding:4px;">
                                        <table role="presentation" style="border-radius:3px;width:24px;" cellspacing="0" cellpadding="0" border="0">
                                        <tbody><tr>
                                            <td style="font-size:0;height:24px;vertical-align:middle;width:24px;">
                                            <a href="#" target="_blank" style="color: #0078be; text-decoration: none; font-weight: 500;">
                                                <img alt="twitter-logo" src="https://codedmails.com/images/social/light/twitter-logo-transparent-light.png" style="border-radius:3px;display:block;" width="24" height="24" />
                                            </a>
                                            </td>
                                        </tr>
                                        </tbody></table>
                                    </td>
                                    </tr>
                                </tbody></table>
                                <!--[if mso | IE]>
                        </td>
                        
                        <td>
                        <![endif]-->
                                <table role="presentation" style="float:none;display:inline-table;" cellspacing="0" cellpadding="0" border="0" align="center">
                                    <tbody><tr>
                                    <td style="padding:4px;">
                                        <table role="presentation" style="border-radius:3px;width:24px;" cellspacing="0" cellpadding="0" border="0">
                                        <tbody><tr>
                                            <td style="font-size:0;height:24px;vertical-align:middle;width:24px;">
                                            <a href="#" target="_blank" style="color: #0078be; text-decoration: none; font-weight: 500;">
                                                <img alt="facebook-logo" src="https://codedmails.com/images/social/light/facebook-logo-transparent-light.png" style="border-radius:3px;display:block;" width="24" height="24" />
                                            </a>
                                            </td>
                                        </tr>
                                        </tbody></table>
                                    </td>
                                    </tr>
                                </tbody></table>
                                <!--[if mso | IE]>
                        </td>
                        
                        <td>
                        <![endif]-->
                                <table role="presentation" style="float:none;display:inline-table;" cellspacing="0" cellpadding="0" border="0" align="center">
                                    <tbody><tr>
                                    <td style="padding:4px;">
                                        <table role="presentation" style="border-radius:3px;width:24px;" cellspacing="0" cellpadding="0" border="0">
                                        <tbody><tr>
                                            <td style="font-size:0;height:24px;vertical-align:middle;width:24px;">
                                            <a href="#" target="_blank" style="color: #0078be; text-decoration: none; font-weight: 500;">
                                                <img alt="instagram-logo" src="https://codedmails.com/images/social/light/instagram-logo-transparent-light.png" style="border-radius:3px;display:block;" width="24" height="24" />
                                            </a>
                                            </td>
                                        </tr>
                                        </tbody></table>
                                    </td>
                                    </tr>
                                </tbody></table>
                                <!--[if mso | IE]>
                        </td>
                        
                        <td>
                        <![endif]-->
                                <table role="presentation" style="float:none;display:inline-table;" cellspacing="0" cellpadding="0" border="0" align="center">
                                    <tbody><tr>
                                    <td style="padding:4px;">
                                        <table role="presentation" style="border-radius:3px;width:24px;" cellspacing="0" cellpadding="0" border="0">
                                        <tbody><tr>
                                            <td style="font-size:0;height:24px;vertical-align:middle;width:24px;">
                                            <a href="#" target="_blank" style="color: #0078be; text-decoration: none; font-weight: 500;">
                                                <img alt="youtube-logo" src="https://codedmails.com/images/social/light/youtube-logo-transparent-light.png" style="border-radius:3px;display:block;" width="24" height="24" />
                                            </a>
                                            </td>
                                        </tr>
                                        </tbody></table>
                                    </td>
                                    </tr>
                                </tbody></table>
                                <!--[if mso | IE]>
                        </td>
                        
                    </tr>
                    </table>
                <![endif]-->
                                </td>
                            </tr>
                            <tr>
                                <td style="font-size:0px;padding:10px 25px;word-break:break-word;" align="center">
                                <div style="font-family:Montserrat, Helvetica, Arial, sans-serif;font-size:14px;font-weight:400;line-height:22px;text-align:center;color:#8189A9;">
                                © 2021 Wallet Engine, Lagos,<br />Nigeria</div>
                                </td>
                            </tr>
                            <tr>
                                <td style="font-size:0px;padding:10px 25px;word-break:break-word;" align="center">
                                <div style="font-family:Montserrat, Helvetica, Arial, sans-serif;font-size:14px;font-weight:400;line-height:22px;text-align:center;color:#8189A9;">
                                Update your <a class="footer-link" href="#" style="color: #0078be; text-decoration: none; font-weight: 500;">
                                email preferences</a> to choose the types of emails you receive, or you can <a href="" class="footer-link" style="color: #0078be; text-decoration: none; font-weight: 500;"> unsubscribe </a>from all future emails.</div>
                                </td>
                            </tr>
                            </tbody></table>
                        </div>
                        <!--[if mso | IE]>
                        </td>
                    
                    </tr>
                
                            </table>
                            <![endif]-->
                        </td>
                    </tr>
                    </tbody>
                </table>
                </div>
                <!--[if mso | IE]>
                    </td>
                    </tr>
                </table>
                
                <table
                    align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
                >
                    <tr>
                    <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                <![endif]-->
                <div style="margin:0px auto;max-width:600px;">
                <table role="presentation" style="width:100%;" cellspacing="0" cellpadding="0" border="0" align="center">
                    <tbody>
                    <tr>
                        <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
                        <!--[if mso | IE]>
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                            
                    <tr>
                
                        <td
                        class="" style="vertical-align:top;width:600px;"
                        >
                    <![endif]-->
                        <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                            <table role="presentation" style="vertical-align:top;" width="100%" cellspacing="0" cellpadding="0" border="0">
                            <tbody><tr>
                                <td style="font-size:0px;word-break:break-word;">
                                <!--[if mso | IE]>
                
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td height="1" style="vertical-align:top;height:1px;">
                
                <![endif]-->
                                <div style="height:1px;">   </div>
                                <!--[if mso | IE]>
                
                    </td></tr></table>
                
                <![endif]-->
                                </td>
                            </tr>
                            </tbody></table>
                        </div>
                        <!--[if mso | IE]>
                        </td>
                    
                    </tr>
                
                            </table>
                            <![endif]-->
                        </td>
                    </tr>
                    </tbody>
                </table>
                </div>
                <!--[if mso | IE]>
                    </td>
                    </tr>
                </table>
                <![endif]-->
            </div>
            </body><grammarly-desktop-integration data-grammarly-shadow-root="true"></grammarly-desktop-integration></html>
            `
        }
        await mainEmail(AccountCreation).catch(console.error) 
        data.password=undefined;
        data.salt=undefined
        return res.status(200).json({message:"acount succesfully created", data})
    } catch (error) {
        return res.status(503).json({error:"error in creating doctor", err:error}) 
    }
}

exports.activate = async (req, res)=>{
    // #swagger.tags = ['User Authentication']
    // #swagger.summary = 'Actiavte user account and create the Wallet'
    // #swagger.description = 'Endpoint to activate user account and create a wallet for the user'
    try {
        const {token} = req.body;
        // const data = await models.User.Activate(token);
        const data = await users.activateAndCreateWallet(token)
        if(data.error){
            return res.status(404).json({error:"Invalid token"})
        }
        const AccountActivation = {
            from : "support@wallet-engine.org",
            to:data.email,
            replyTo:"support@wallet-engine.org",
            subject: "Account activation",
            html:`
            <!DOCTYPE html>
            <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en"><head>
            <title> Welcome to Wallet Engine </title>
            <!--[if !mso]><!-- -->
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <!--<![endif]-->
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <style type="text/css">
                #outlook a {
                padding: 0;
                }
    
                body {
                margin: 0;
                padding: 0;
                -webkit-text-size-adjust: 100%;
                -ms-text-size-adjust: 100%;
                }
    
                table,
                td {
                border-collapse: collapse;
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                }
    
                img {
                border: 0;
                height: auto;
                line-height: 100%;
                outline: none;
                text-decoration: none;
                -ms-interpolation-mode: bicubic;
                }
    
                p {
                display: block;
                margin: 13px 0;
                }
            </style>
            <!--[if mso]>
                    <xml>
                    <o:OfficeDocumentSettings>
                    <o:AllowPNG/>
                    <o:PixelsPerInch>96</o:PixelsPerInch>
                    </o:OfficeDocumentSettings>
                    </xml>
                    <![endif]-->
            <!--[if lte mso 11]>
                    <style type="text/css">
                    .mj-outlook-group-fix { width:100% !important; }
                    </style>
                    <![endif]-->
            <!--[if !mso]><!-->
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500&amp;display=swap" rel="stylesheet" type="text/css" />
            <style type="text/css">
                @import url(https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500&amp;display=swap);
            </style>
            <!--<![endif]-->
            <style type="text/css">
                @media only screen and (min-width:480px) {
                .mj-column-per-100 {
                    width: 100% !important;
                    max-width: 100%;
                }
                }
            </style>
            <style type="text/css">
                @media only screen and (max-width:480px) {
                table.mj-full-width-mobile {
                    width: 100% !important;
                }
    
                td.mj-full-width-mobile {
                    width: auto !important;
                }
                }
            </style>
            <style type="text/css">
                a,
                span,
                td,
                th {
                -webkit-font-smoothing: antialiased !important;
                -moz-osx-font-smoothing: grayscale !important;
                }
            </style>
            </head>
    
            <body style="background-color:#F4F5FB;" data-new-gr-c-s-check-loaded="8.884.0" data-gr-ext-installed="">
            <div style="display:none;font-size:1px;color:#ffffff;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">
             Welcome to Wallet Engine </div>
            <div style="background-color:#F4F5FB;">
                <!--[if mso | IE]>
                <table
                    align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
                >
                    <tr>
                    <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                <![endif]-->
                <div style="margin:0px auto;max-width:600px;">
                <table role="presentation" style="width:100%;" cellspacing="0" cellpadding="0" border="0" align="center">
                    <tbody>
                    <tr>
                        <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
                        <!--[if mso | IE]>
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                            
                    <tr>
                        <td
                        class="" style="vertical-align:top;width:600px;"
                        >
                    <![endif]-->
                        <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                            <table role="presentation" style="vertical-align:top;" width="100%" cellspacing="0" cellpadding="0" border="0">
                            <tbody><tr>
                                <td style="font-size:0px;word-break:break-word;">
                                <!--[if mso | IE]>
                
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td height="5" style="vertical-align:top;height:5px;">
                
                <![endif]-->
                                <div style="height:5px;">   </div>
                                <!--[if mso | IE]>
                
                    </td></tr></table>
                
                <![endif]-->
                                </td>
                            </tr>
                            </tbody></table>
                        </div>
                        <!--[if mso | IE]>
                        </td>
                    
                    </tr>
                
                            </table>
                            <![endif]-->
                        </td>
                    </tr>
                    </tbody>
                </table>
                </div>
                <!--[if mso | IE]>
                    </td>
                    </tr>
                </table>
                
                <table
                    align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
                >
                    <tr>
                    <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                
                    <v:rect  style="width:600px;" xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false">
                    <v:fill  origin="0.5, 0" position="0.5, 0" src="https://images.unsplash.com/photo-1494253109108-2e30c049369b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80" type="tile" />
                    <v:textbox style="mso-fit-shape-to-text:true" inset="0,0,0,0">
                <![endif]-->
                <div style="background:url(https://images.unsplash.com/photo-1494253109108-2e30c049369b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=600&amp;q=80) top center / auto no-repeat;margin:0px auto;border-radius:20px;max-width:600px;">
                <div style="line-height:0;font-size:0;">
                    <table role="presentation" style="background:url(https://images.unsplash.com/photo-1494253109108-2e30c049369b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=600&amp;q=80) top center / auto no-repeat;width:100%;border-radius:20px;" cellspacing="0" cellpadding="0" border="0" background="https://images.unsplash.com/photo-1494253109108-2e30c049369b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=600&amp;q=80" align="center">
                    <tbody>
                        <tr>
                        <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
                            <!--[if mso | IE]>
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                            
                    <tr>
                
                        <td
                        class="" style="vertical-align:top;width:600px;"
                        >
                    <![endif]-->
                            <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                            <table role="presentation" style="vertical-align:top;" width="100%" cellspacing="0" cellpadding="0" border="0">
                                <tbody><tr>
                                <td style="font-size:0px;padding:8px 0;word-break:break-word;" align="center">
                                    <table role="presentation" style="border-collapse:collapse;border-spacing:0px;" cellspacing="0" cellpadding="0" border="0">
                                    <tbody>
                                        <tr>
                                        <td style="width:150px;">
                                            <img src="${process.env.CLIENT_URL}/logo.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="150" height="auto" />
                                        </td>
                                        </tr>
                                    </tbody>
                                    </table>
                                </td>
                                </tr>
                                <tr>
                                <td style="font-size:0px;word-break:break-word;">
                                    <!--[if mso | IE]>
                
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td height="250" style="vertical-align:top;height:250px;">
                
                <![endif]-->
                                    <div style="height:250px;">   </div>
                                    <!--[if mso | IE]>
                
                    </td></tr></table>
                
                <![endif]-->
                                </td>
                                </tr>
                            </tbody></table>
                            </div>
                            <!--[if mso | IE]>
                        </td>
                    
                    </tr>
                
                            </table>
                            <![endif]-->
                        </td>
                        </tr>
                    </tbody>
                    </table>
                </div>
                </div>
                <!--[if mso | IE]>
                    </v:textbox>
                </v:rect>
                
                    </td>
                    </tr>
                </table>
                
                <table
                    align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
                >
                    <tr>
                    <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                <![endif]-->
                <div style="background:#F4F5FB;background-color:#F4F5FB;margin:0px auto;max-width:600px;">
                <table role="presentation" style="background:#F4F5FB;background-color:#F4F5FB;width:100%;" cellspacing="0" cellpadding="0" border="0" align="center">
                    <tbody>
                    <tr>
                        <td style="direction:ltr;font-size:0px;padding:15px;text-align:center;">
                        <!--[if mso | IE]>
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                            
                    <tr>
                
                        <td
                        class="" style="vertical-align:top;width:570px;"
                        >
                    <![endif]-->
                        <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                            <table role="presentation" style="vertical-align:top;" width="100%" cellspacing="0" cellpadding="0" border="0">
                            </table>
                        </div>
                        <!--[if mso | IE]>
                        </td>
                    
                    </tr>
                
                            </table>
                            <![endif]-->
                        </td>
                    </tr>
                    </tbody>
                </table>
                </div>
                <!--[if mso | IE]>
                    </td>
                    </tr>
                </table>
                
                <table
                    align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
                >
                    <tr>
                    <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                <![endif]-->
                <div style="background:#ffffff;background-color:#ffffff;margin:0px auto;border-radius:20px;max-width:600px;">
                <table role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;border-radius:20px;" cellspacing="0" cellpadding="0" border="0" align="center">
                    <tbody>
                    <tr>
                        <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
                        <!--[if mso | IE]>
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                            
                    <tr>
                
                        <td
                        class="" style="vertical-align:top;width:600px;"
                        >
                    <![endif]-->
                        <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                            <table role="presentation" style="vertical-align:top;" width="100%" cellspacing="0" cellpadding="0" border="0">
                            <tbody><tr>
                                <td style="font-size:0px;padding:10px 25px;word-break:break-word;" align="left">
                                <div style="font-family:Montserrat, Helvetica, Arial, sans-serif;font-size:20px;font-weight:500;line-height:30px;text-align:left;color:#8189A9;">
                                Welcome to Wallet Engine</div>
                                </td>
                            </tr>
                            <tr>
                                <td style="font-size:0px;padding:10px 25px;word-break:break-word;" align="left">
                                <div style="font-family:Montserrat, Helvetica, Arial, sans-serif;font-size:16px;font-weight:400;line-height:20px;text-align:left;color:#8189A9;">
                                Thanks for your time to take the registration <br />
                                you can start using our service.
                                </div>
                                </td>
                            </tr>
                            <tr>
                                <td style="font-size:0px;padding:10px 25px;word-break:break-word;" align="left">
                                <div style="font-family:Montserrat, Helvetica, Arial, sans-serif;font-size:16px;font-weight:400;line-height:20px;text-align:left;color:#8189A9;">If you have any questions simply reply to this email and we would be more than happy to reply. :)</div>
                                </td>
                            </tr>
                            </tbody></table>
                        </div>
                        <!--[if mso | IE]>
                        </td>
                    
                    </tr>
                
                            </table>
                            <![endif]-->
                        </td>
                    </tr>
                    </tbody>
                </table>
                </div>
                <!--[if mso | IE]>
                    </td>
                    </tr>
                </table>
                
                <table
                    align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
                >
                    <tr>
                    <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                <![endif]-->
                <div style="background:#F4F5FB;background-color:#F4F5FB;margin:0px auto;max-width:600px;">
                <table role="presentation" style="background:#F4F5FB;background-color:#F4F5FB;width:100%;" cellspacing="0" cellpadding="0" border="0" align="center">
                    <tbody>
                    <tr>
                        <td style="direction:ltr;font-size:0px;padding:15px;text-align:center;">
                        <!--[if mso | IE]>
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                            
                    <tr>
                
                        <td
                        class="" style="vertical-align:top;width:570px;"
                        >
                    <![endif]-->
                        <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                            <table role="presentation" style="vertical-align:top;" width="100%" cellspacing="0" cellpadding="0" border="0">
                            </table>
                        </div>
                        <!--[if mso | IE]>
                        </td>
                    
                    </tr>
                
                            </table>
                            <![endif]-->
                        </td>
                    </tr>
                    </tbody>
                </table>
                </div>
                <!--[if mso | IE]>
                    </td>
                    </tr>
                </table>
                
                <table
                    align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
                >
                    <tr>
                    <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                <![endif]-->
                <div style="background:#edeef6;background-color:#edeef6;margin:0px auto;border-radius:20px;max-width:600px;">
                <table role="presentation" style="background:#edeef6;background-color:#edeef6;width:100%;border-radius:20px;" cellspacing="0" cellpadding="0" border="0" align="center">
                    <tbody>
                    <tr>
                        <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
                        <!--[if mso | IE]>
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                            
                    <tr>
                
                        <td
                        class="" style="vertical-align:top;width:600px;"
                        >
                    <![endif]-->
                        <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                            <table role="presentation" style="vertical-align:top;" width="100%" cellspacing="0" cellpadding="0" border="0">
                            <tbody><tr>
                                <td style="font-size:0px;padding:10px 25px;word-break:break-word;" align="center">
                                <!--[if mso | IE]>
                <table
                    align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                >
                    <tr>
                
                        <td>
                        <![endif]-->
                                <table role="presentation" style="float:none;display:inline-table;" cellspacing="0" cellpadding="0" border="0" align="center">
                                    <tbody><tr>
                                    <td style="padding:4px;">
                                        <table role="presentation" style="border-radius:3px;width:24px;" cellspacing="0" cellpadding="0" border="0">
                                        <tbody><tr>
                                            <td style="font-size:0;height:24px;vertical-align:middle;width:24px;">
                                            <a href="#" target="_blank" style="color: #0078be; text-decoration: none; font-weight: 500;">
                                                <img alt="twitter-logo" src="https://codedmails.com/images/social/light/twitter-logo-transparent-light.png" style="border-radius:3px;display:block;" width="24" height="24" />
                                            </a>
                                            </td>
                                        </tr>
                                        </tbody></table>
                                    </td>
                                    </tr>
                                </tbody></table>
                                <!--[if mso | IE]>
                        </td>
                        
                        <td>
                        <![endif]-->
                                <table role="presentation" style="float:none;display:inline-table;" cellspacing="0" cellpadding="0" border="0" align="center">
                                    <tbody><tr>
                                    <td style="padding:4px;">
                                        <table role="presentation" style="border-radius:3px;width:24px;" cellspacing="0" cellpadding="0" border="0">
                                        <tbody><tr>
                                            <td style="font-size:0;height:24px;vertical-align:middle;width:24px;">
                                            <a href="#" target="_blank" style="color: #0078be; text-decoration: none; font-weight: 500;">
                                                <img alt="facebook-logo" src="https://codedmails.com/images/social/light/facebook-logo-transparent-light.png" style="border-radius:3px;display:block;" width="24" height="24" />
                                            </a>
                                            </td>
                                        </tr>
                                        </tbody></table>
                                    </td>
                                    </tr>
                                </tbody></table>
                                <!--[if mso | IE]>
                        </td>
                        
                        <td>
                        <![endif]-->
                                <table role="presentation" style="float:none;display:inline-table;" cellspacing="0" cellpadding="0" border="0" align="center">
                                    <tbody><tr>
                                    <td style="padding:4px;">
                                        <table role="presentation" style="border-radius:3px;width:24px;" cellspacing="0" cellpadding="0" border="0">
                                        <tbody><tr>
                                            <td style="font-size:0;height:24px;vertical-align:middle;width:24px;">
                                            <a href="#" target="_blank" style="color: #0078be; text-decoration: none; font-weight: 500;">
                                                <img alt="instagram-logo" src="https://codedmails.com/images/social/light/instagram-logo-transparent-light.png" style="border-radius:3px;display:block;" width="24" height="24" />
                                            </a>
                                            </td>
                                        </tr>
                                        </tbody></table>
                                    </td>
                                    </tr>
                                </tbody></table>
                                <!--[if mso | IE]>
                        </td>
                        
                        <td>
                        <![endif]-->
                                <table role="presentation" style="float:none;display:inline-table;" cellspacing="0" cellpadding="0" border="0" align="center">
                                    <tbody><tr>
                                    <td style="padding:4px;">
                                        <table role="presentation" style="border-radius:3px;width:24px;" cellspacing="0" cellpadding="0" border="0">
                                        <tbody><tr>
                                            <td style="font-size:0;height:24px;vertical-align:middle;width:24px;">
                                            <a href="#" target="_blank" style="color: #0078be; text-decoration: none; font-weight: 500;">
                                                <img alt="youtube-logo" src="https://codedmails.com/images/social/light/youtube-logo-transparent-light.png" style="border-radius:3px;display:block;" width="24" height="24" />
                                            </a>
                                            </td>
                                        </tr>
                                        </tbody></table>
                                    </td>
                                    </tr>
                                </tbody></table>
                                <!--[if mso | IE]>
                        </td>
                        
                    </tr>
                    </table>
                <![endif]-->
                                </td>
                            </tr>
                            <tr>
                                <td style="font-size:0px;padding:10px 25px;word-break:break-word;" align="center">
                                <div style="font-family:Montserrat, Helvetica, Arial, sans-serif;font-size:14px;font-weight:400;line-height:22px;text-align:center;color:#8189A9;">
                                © 2021 Wallet Engine, Lagos,<br />Nigeria</div>
                                </td>
                            </tr>
                            <tr>
                                <td style="font-size:0px;padding:10px 25px;word-break:break-word;" align="center">
                                <div style="font-family:Montserrat, Helvetica, Arial, sans-serif;font-size:14px;font-weight:400;line-height:22px;text-align:center;color:#8189A9;">Update your <a class="footer-link" href="#" style="color: #0078be; text-decoration: none; font-weight: 500;">email preferences</a> to choose the types of emails you receive, or you can <a href="" class="footer-link" style="color: #0078be; text-decoration: none; font-weight: 500;"> unsubscribe </a>from all future emails.</div>
                                </td>
                            </tr>
                            </tbody></table>
                        </div>
                        <!--[if mso | IE]>
                        </td>
                    
                    </tr>
                
                            </table>
                            <![endif]-->
                        </td>
                    </tr>
                    </tbody>
                </table>
                </div>
                <!--[if mso | IE]>
                    </td>
                    </tr>
                </table>
                
                <table
                    align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
                >
                    <tr>
                    <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                <![endif]-->
                <div style="margin:0px auto;max-width:600px;">
                <table role="presentation" style="width:100%;" cellspacing="0" cellpadding="0" border="0" align="center">
                    <tbody>
                    <tr>
                        <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
                        <!--[if mso | IE]>
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                            
                    <tr>
                
                        <td
                        class="" style="vertical-align:top;width:600px;"
                        >
                    <![endif]-->
                        <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                            <table role="presentation" style="vertical-align:top;" width="100%" cellspacing="0" cellpadding="0" border="0">
                            <tbody><tr>
                                <td style="font-size:0px;word-break:break-word;">
                                <!--[if mso | IE]>
                
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td height="1" style="vertical-align:top;height:1px;">
                
                <![endif]-->
                                <div style="height:1px;">   </div>
                                <!--[if mso | IE]>
                
                    </td></tr></table>
                
                <![endif]-->
                                </td>
                            </tr>
                            </tbody></table>
                        </div>
                        <!--[if mso | IE]>
                        </td>
                    
                    </tr>
                
                            </table>
                            <![endif]-->
                        </td>
                    </tr>
                    </tbody>
                </table>
                </div>
                <!--[if mso | IE]>
                    </td>
                    </tr>
                </table>
                <![endif]-->
            </div>
            </body><grammarly-desktop-integration data-grammarly-shadow-root="true"></grammarly-desktop-integration></html>
            `
        }
        await mainEmail(AccountActivation).catch(console.error) 
        data.password=undefined;
        data.salt=undefined
        return res.status(200).json({message:"acount succesfully activated and Wallet created", data})
    } catch (error) {
        return res.status(503).json({error:"error in ", err:error})  
    }
}

exports.signIn = async (req, res)=>{
    // #swagger.tags = ['User Authentication']
    // #swagger.summary = 'Signin user'
    // #swagger.description = 'Endpoint to signin user to perform transaction .'
    try {
        const {password, login } = req.body;
        const user = await models.User.findByLogin(login);
        if(!user){
            return res.status(400).json({error:"phone number or email is not exist"})
        }
        if(!user.activate){
            return res.status(406).json({error:"your account is not activated, kindly activate your account"})
        }
        if(user.blocked){
            return res.status(406).json({error:"your account is blocked, kindly contact support team"})
        }
        const isValid = await models.User.validatePassword(password, user.salt, user.password)
        if(!isValid){
            return res.status(406).json({error:"incorrect Password"})
        }
        const token = jwt.sign(
            { id: user.id, role:"user", user:user },
            process.env.JWT_SECRET
        );
        user.password=undefined;
        user.salt=undefined
        return res.status(200).json({message:"success", token, data:user})
    } catch (error) {
        return res.status(503).json({error:"error in signin user", err:error})  
    }
}

exports.forgetPassword = async (req, res)=>{
    // #swagger.tags = ['User Authentication']
    // #swagger.summary = 'Password reset request for User'
    // #swagger.description = 'Endpoint to request for password reset token'
    try {
        const {login} = req.body;
        const user = await models.User.findByLogin(login);
        if(!user){
            return res.status(400).json({error:"email or phone number is not found"})
        }
        if(!user.activate){
            return res.status(406).json({error:"your account is not activated, kindly activate your account"})
        }
        if(user.blocked){
            return res.status(406).json({error:"your account is blocked, kindly contact support team"})
        }
        const token = hash(user.id)
        const payload = {token}
        const data = models.User.update(payload, {where:{id:user.id}})
        if(!data){
            return res.status(400).json({error:"Error in setting reset token for your account, please contact suppor",})
        }
        const AccountPassword = {
            from : "support@wallet-engine.org",
            to:user.email,
            replyTo:"support@wallet-engine.org",
            subject: "Forget Password | reset code",
            html:`
            <!DOCTYPE html>
            <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en"><head>
            <title> Welcome to Wallet Engine </title>
            <!--[if !mso]><!-- -->
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <!--<![endif]-->
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <style type="text/css">
                #outlook a {
                padding: 0;
                }
    
                body {
                margin: 0;
                padding: 0;
                -webkit-text-size-adjust: 100%;
                -ms-text-size-adjust: 100%;
                }
    
                table,
                td {
                border-collapse: collapse;
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                }
    
                img {
                border: 0;
                height: auto;
                line-height: 100%;
                outline: none;
                text-decoration: none;
                -ms-interpolation-mode: bicubic;
                }
    
                p {
                display: block;
                margin: 13px 0;
                }
            </style>
            <!--[if mso]>
                    <xml>
                    <o:OfficeDocumentSettings>
                    <o:AllowPNG/>
                    <o:PixelsPerInch>96</o:PixelsPerInch>
                    </o:OfficeDocumentSettings>
                    </xml>
                    <![endif]-->
            <!--[if lte mso 11]>
                    <style type="text/css">
                    .mj-outlook-group-fix { width:100% !important; }
                    </style>
                    <![endif]-->
            <!--[if !mso]><!-->
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500&amp;display=swap" rel="stylesheet" type="text/css" />
            <style type="text/css">
                @import url(https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500&amp;display=swap);
            </style>
            <!--<![endif]-->
            <style type="text/css">
                @media only screen and (min-width:480px) {
                .mj-column-per-100 {
                    width: 100% !important;
                    max-width: 100%;
                }
                }
            </style>
            <style type="text/css">
                @media only screen and (max-width:480px) {
                table.mj-full-width-mobile {
                    width: 100% !important;
                }
    
                td.mj-full-width-mobile {
                    width: auto !important;
                }
                }
            </style>
            <style type="text/css">
                a,
                span,
                td,
                th {
                -webkit-font-smoothing: antialiased !important;
                -moz-osx-font-smoothing: grayscale !important;
                }
            </style>
            </head>
    
            <body style="background-color:#F4F5FB;" data-new-gr-c-s-check-loaded="8.884.0" data-gr-ext-installed="">
            <div style="display:none;font-size:1px;color:#ffffff;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;">
             Wallet Engine Password Reset </div>
            <div style="background-color:#F4F5FB;">
                <!--[if mso | IE]>
                <table
                    align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
                >
                    <tr>
                    <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                <![endif]-->
                <div style="margin:0px auto;max-width:600px;">
                <table role="presentation" style="width:100%;" cellspacing="0" cellpadding="0" border="0" align="center">
                    <tbody>
                    <tr>
                        <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
                        <!--[if mso | IE]>
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                            
                    <tr>
                
                        <td
                        class="" style="vertical-align:top;width:600px;"
                        >
                    <![endif]-->
                        <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                            <table role="presentation" style="vertical-align:top;" width="100%" cellspacing="0" cellpadding="0" border="0">
                            <tbody><tr>
                                <td style="font-size:0px;word-break:break-word;">
                                <!--[if mso | IE]>
                
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td height="5" style="vertical-align:top;height:5px;">
                
                <![endif]-->
                                <div style="height:5px;">   </div>
                                <!--[if mso | IE]>
                
                    </td></tr></table>
                
                <![endif]-->
                                </td>
                            </tr>
                            </tbody></table>
                        </div>
                        <!--[if mso | IE]>
                        </td>
                    
                    </tr>
                
                            </table>
                            <![endif]-->
                        </td>
                    </tr>
                    </tbody>
                </table>
                </div>
                <!--[if mso | IE]>
                    </td>
                    </tr>
                </table>
                
                <table
                    align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
                >
                    <tr>
                    <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                
                    <v:rect  style="width:600px;" xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false">
                    <v:fill  origin="0.5, 0" position="0.5, 0" src="https://images.unsplash.com/photo-1494253109108-2e30c049369b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80" type="tile" />
                    <v:textbox style="mso-fit-shape-to-text:true" inset="0,0,0,0">
                <![endif]-->
                <div style="background:url(https://images.unsplash.com/photo-1494253109108-2e30c049369b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=600&amp;q=80) top center / auto no-repeat;margin:0px auto;border-radius:20px;max-width:600px;">
                <div style="line-height:0;font-size:0;">
                    <table role="presentation" style="background:url(https://images.unsplash.com/photo-1494253109108-2e30c049369b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=600&amp;q=80) top center / auto no-repeat;width:100%;border-radius:20px;" cellspacing="0" cellpadding="0" border="0" background="https://images.unsplash.com/photo-1494253109108-2e30c049369b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=600&amp;q=80" align="center">
                    <tbody>
                        <tr>
                        <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
                            <!--[if mso | IE]>
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                            
                    <tr>
                
                        <td
                        class="" style="vertical-align:top;width:600px;"
                        >
                    <![endif]-->
                            <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                            <table role="presentation" style="vertical-align:top;" width="100%" cellspacing="0" cellpadding="0" border="0">
                                <tbody><tr>
                                <td style="font-size:0px;padding:8px 0;word-break:break-word;" align="center">
                                    <table role="presentation" style="border-collapse:collapse;border-spacing:0px;" cellspacing="0" cellpadding="0" border="0">
                                    <tbody>
                                        <tr>
                                        <td style="width:150px;">
                                            <img src="${process.env.CLIENT_URL}/logo.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="150" height="auto" />
                                        </td>
                                        </tr>
                                    </tbody>
                                    </table>
                                </td>
                                </tr>
                                <tr>
                                <td style="font-size:0px;word-break:break-word;">
                                    <!--[if mso | IE]>
                
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td height="250" style="vertical-align:top;height:250px;">
                
                <![endif]-->
                                    <div style="height:250px;">   </div>
                                    <!--[if mso | IE]>
                
                    </td></tr></table>
                
                <![endif]-->
                                </td>
                                </tr>
                            </tbody></table>
                            </div>
                            <!--[if mso | IE]>
                        </td>
                    
                    </tr>
                
                            </table>
                            <![endif]-->
                        </td>
                        </tr>
                    </tbody>
                    </table>
                </div>
                </div>
                <!--[if mso | IE]>
                    </v:textbox>
                </v:rect>
                
                    </td>
                    </tr>
                </table>
                
                <table
                    align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
                >
                    <tr>
                    <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                <![endif]-->
                <div style="background:#F4F5FB;background-color:#F4F5FB;margin:0px auto;max-width:600px;">
                <table role="presentation" style="background:#F4F5FB;background-color:#F4F5FB;width:100%;" cellspacing="0" cellpadding="0" border="0" align="center">
                    <tbody>
                    <tr>
                        <td style="direction:ltr;font-size:0px;padding:15px;text-align:center;">
                        <!--[if mso | IE]>
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                            
                    <tr>
                
                        <td
                        class="" style="vertical-align:top;width:570px;"
                        >
                    <![endif]-->
                        <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                            <table role="presentation" style="vertical-align:top;" width="100%" cellspacing="0" cellpadding="0" border="0">
                            </table>
                        </div>
                        <!--[if mso | IE]>
                        </td>
                    
                    </tr>
                
                            </table>
                            <![endif]-->
                        </td>
                    </tr>
                    </tbody>
                </table>
                </div>
                <!--[if mso | IE]>
                    </td>
                    </tr>
                </table>
                
                <table
                    align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
                >
                    <tr>
                    <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                <![endif]-->
                <div style="background:#ffffff;background-color:#ffffff;margin:0px auto;border-radius:20px;max-width:600px;">
                <table role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;border-radius:20px;" cellspacing="0" cellpadding="0" border="0" align="center">
                    <tbody>
                    <tr>
                        <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
                        <!--[if mso | IE]>
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                            
                    <tr>
                
                        <td
                        class="" style="vertical-align:top;width:600px;"
                        >
                    <![endif]-->
                        <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                            <table role="presentation" style="vertical-align:top;" width="100%" cellspacing="0" cellpadding="0" border="0">
                            <tbody><tr>
                                <td style="font-size:0px;padding:10px 25px;word-break:break-word;" align="left">
                                <div style="font-family:Montserrat, Helvetica, Arial, sans-serif;font-size:20px;font-weight:500;line-height:30px;text-align:left;color:#8189A9;">
                                Wallet Engine Password reset token </div>
                                </td>
                            </tr>
                            <tr>
                                <td style="font-size:0px;padding:10px 25px;word-break:break-word;" align="left">
                                <div style="font-family:Montserrat, Helvetica, Arial, sans-serif;font-size:16px;font-weight:400;line-height:20px;text-align:left;color:#8189A9;">
                                You want to reset your Password <br />
                                Use <a href="#" style="color: #0078be; text-decoration: none; font-weight: 500;">${token}</a> code to reset your password . 
                                if you don't request for reset password token kindly ignore.</div>
                                </td>
                            </tr>
                            <tr>
                                <td vertical-align="middle" style="font-size:0px;padding:10px 25px;word-break:break-word;" align="left">
                                <table role="presentation" style="border-collapse:separate;line-height:100%;" cellspacing="0" cellpadding="0" border="0">
                                    <tbody><tr>
                                    <td role="presentation" style="border:none;border-radius:3px;cursor:auto;mso-padding-alt:10px 25px;background:#0078be;" valign="middle" bgcolor="#0078be" align="center">
                                        <a href="#" style="display: inline-block; background: #0078be; color: #ffffff; font-family: Montserrat, Helvetica, Arial, sans-serif; font-size: 15px; font-weight: 500; line-height: 24px; margin: 0; text-decoration: none; text-transform: none; padding: 10px 25px; mso-padding-alt: 0px; border-radius: 3px;">
                                        ${token} 
                                        </a>
                                    </td>
                                    </tr>
                                </tbody></table>
                                </td>
                            </tr>
                            <tr>
                                <td style="font-size:0px;padding:10px 25px;word-break:break-word;" align="left">
                                <div style="font-family:Montserrat, Helvetica, Arial, sans-serif;font-size:16px;font-weight:400;line-height:20px;text-align:left;color:#8189A9;">If you have any questions simply reply to this email and we would be more than happy to reply. :)</div>
                                </td>
                            </tr>
                            </tbody></table>
                        </div>
                        <!--[if mso | IE]>
                        </td>
                    
                    </tr>
                
                            </table>
                            <![endif]-->
                        </td>
                    </tr>
                    </tbody>
                </table>
                </div>
                <!--[if mso | IE]>
                    </td>
                    </tr>
                </table>
                
                <table
                    align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
                >
                    <tr>
                    <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                <![endif]-->
                <div style="background:#F4F5FB;background-color:#F4F5FB;margin:0px auto;max-width:600px;">
                <table role="presentation" style="background:#F4F5FB;background-color:#F4F5FB;width:100%;" cellspacing="0" cellpadding="0" border="0" align="center">
                    <tbody>
                    <tr>
                        <td style="direction:ltr;font-size:0px;padding:15px;text-align:center;">
                        <!--[if mso | IE]>
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                            
                    <tr>
                
                        <td
                        class="" style="vertical-align:top;width:570px;"
                        >
                    <![endif]-->
                        <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                            <table role="presentation" style="vertical-align:top;" width="100%" cellspacing="0" cellpadding="0" border="0">
                            </table>
                        </div>
                        <!--[if mso | IE]>
                        </td>
                    
                    </tr>
                
                            </table>
                            <![endif]-->
                        </td>
                    </tr>
                    </tbody>
                </table>
                </div>
                <!--[if mso | IE]>
                    </td>
                    </tr>
                </table>
                
                <table
                    align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
                >
                    <tr>
                    <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                <![endif]-->
                <div style="background:#edeef6;background-color:#edeef6;margin:0px auto;border-radius:20px;max-width:600px;">
                <table role="presentation" style="background:#edeef6;background-color:#edeef6;width:100%;border-radius:20px;" cellspacing="0" cellpadding="0" border="0" align="center">
                    <tbody>
                    <tr>
                        <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
                        <!--[if mso | IE]>
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                            
                    <tr>
                
                        <td
                        class="" style="vertical-align:top;width:600px;"
                        >
                    <![endif]-->
                        <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                            <table role="presentation" style="vertical-align:top;" width="100%" cellspacing="0" cellpadding="0" border="0">
                            <tbody><tr>
                                <td style="font-size:0px;padding:10px 25px;word-break:break-word;" align="center">
                                <!--[if mso | IE]>
                <table
                    align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                >
                    <tr>
                
                        <td>
                        <![endif]-->
                                <table role="presentation" style="float:none;display:inline-table;" cellspacing="0" cellpadding="0" border="0" align="center">
                                    <tbody><tr>
                                    <td style="padding:4px;">
                                        <table role="presentation" style="border-radius:3px;width:24px;" cellspacing="0" cellpadding="0" border="0">
                                        <tbody><tr>
                                            <td style="font-size:0;height:24px;vertical-align:middle;width:24px;">
                                            <a href="#" target="_blank" style="color: #0078be; text-decoration: none; font-weight: 500;">
                                                <img alt="twitter-logo" src="https://codedmails.com/images/social/light/twitter-logo-transparent-light.png" style="border-radius:3px;display:block;" width="24" height="24" />
                                            </a>
                                            </td>
                                        </tr>
                                        </tbody></table>
                                    </td>
                                    </tr>
                                </tbody></table>
                                <!--[if mso | IE]>
                        </td>
                        
                        <td>
                        <![endif]-->
                                <table role="presentation" style="float:none;display:inline-table;" cellspacing="0" cellpadding="0" border="0" align="center">
                                    <tbody><tr>
                                    <td style="padding:4px;">
                                        <table role="presentation" style="border-radius:3px;width:24px;" cellspacing="0" cellpadding="0" border="0">
                                        <tbody><tr>
                                            <td style="font-size:0;height:24px;vertical-align:middle;width:24px;">
                                            <a href="#" target="_blank" style="color: #0078be; text-decoration: none; font-weight: 500;">
                                                <img alt="facebook-logo" src="https://codedmails.com/images/social/light/facebook-logo-transparent-light.png" style="border-radius:3px;display:block;" width="24" height="24" />
                                            </a>
                                            </td>
                                        </tr>
                                        </tbody></table>
                                    </td>
                                    </tr>
                                </tbody></table>
                                <!--[if mso | IE]>
                        </td>
                        
                        <td>
                        <![endif]-->
                                <table role="presentation" style="float:none;display:inline-table;" cellspacing="0" cellpadding="0" border="0" align="center">
                                    <tbody><tr>
                                    <td style="padding:4px;">
                                        <table role="presentation" style="border-radius:3px;width:24px;" cellspacing="0" cellpadding="0" border="0">
                                        <tbody><tr>
                                            <td style="font-size:0;height:24px;vertical-align:middle;width:24px;">
                                            <a href="#" target="_blank" style="color: #0078be; text-decoration: none; font-weight: 500;">
                                                <img alt="instagram-logo" src="https://codedmails.com/images/social/light/instagram-logo-transparent-light.png" style="border-radius:3px;display:block;" width="24" height="24" />
                                            </a>
                                            </td>
                                        </tr>
                                        </tbody></table>
                                    </td>
                                    </tr>
                                </tbody></table>
                                <!--[if mso | IE]>
                        </td>
                        
                        <td>
                        <![endif]-->
                                <table role="presentation" style="float:none;display:inline-table;" cellspacing="0" cellpadding="0" border="0" align="center">
                                    <tbody><tr>
                                    <td style="padding:4px;">
                                        <table role="presentation" style="border-radius:3px;width:24px;" cellspacing="0" cellpadding="0" border="0">
                                        <tbody><tr>
                                            <td style="font-size:0;height:24px;vertical-align:middle;width:24px;">
                                            <a href="#" target="_blank" style="color: #0078be; text-decoration: none; font-weight: 500;">
                                                <img alt="youtube-logo" src="https://codedmails.com/images/social/light/youtube-logo-transparent-light.png" style="border-radius:3px;display:block;" width="24" height="24" />
                                            </a>
                                            </td>
                                        </tr>
                                        </tbody></table>
                                    </td>
                                    </tr>
                                </tbody></table>
                                <!--[if mso | IE]>
                        </td>
                        
                    </tr>
                    </table>
                <![endif]-->
                                </td>
                            </tr>
                            <tr>
                                <td style="font-size:0px;padding:10px 25px;word-break:break-word;" align="center">
                                <div style="font-family:Montserrat, Helvetica, Arial, sans-serif;font-size:14px;font-weight:400;line-height:22px;text-align:center;color:#8189A9;">
                                © 2021 Wallet Engine, Lagos,<br />Nigeria</div>
                                </td>
                            </tr>
                            <tr>
                                <td style="font-size:0px;padding:10px 25px;word-break:break-word;" align="center">
                                <div style="font-family:Montserrat, Helvetica, Arial, sans-serif;font-size:14px;font-weight:400;line-height:22px;text-align:center;color:#8189A9;">Update your <a class="footer-link" href="#" style="color: #0078be; text-decoration: none; font-weight: 500;">email preferences</a> to choose the types of emails you receive, or you can <a href="" class="footer-link" style="color: #0078be; text-decoration: none; font-weight: 500;"> unsubscribe </a>from all future emails.</div>
                                </td>
                            </tr>
                            </tbody></table>
                        </div>
                        <!--[if mso | IE]>
                        </td>
                    
                    </tr>
                
                            </table>
                            <![endif]-->
                        </td>
                    </tr>
                    </tbody>
                </table>
                </div>
                <!--[if mso | IE]>
                    </td>
                    </tr>
                </table>
                
                <table
                    align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
                >
                    <tr>
                    <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                <![endif]-->
                <div style="margin:0px auto;max-width:600px;">
                <table role="presentation" style="width:100%;" cellspacing="0" cellpadding="0" border="0" align="center">
                    <tbody>
                    <tr>
                        <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
                        <!--[if mso | IE]>
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                            
                    <tr>
                
                        <td
                        class="" style="vertical-align:top;width:600px;"
                        >
                    <![endif]-->
                        <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                            <table role="presentation" style="vertical-align:top;" width="100%" cellspacing="0" cellpadding="0" border="0">
                            <tbody><tr>
                                <td style="font-size:0px;word-break:break-word;">
                                <!--[if mso | IE]>
                
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td height="1" style="vertical-align:top;height:1px;">
                
                <![endif]-->
                                <div style="height:1px;">   </div>
                                <!--[if mso | IE]>
                
                    </td></tr></table>
                
                <![endif]-->
                                </td>
                            </tr>
                            </tbody></table>
                        </div>
                        <!--[if mso | IE]>
                        </td>
                    
                    </tr>
                
                            </table>
                            <![endif]-->
                        </td>
                    </tr>
                    </tbody>
                </table>
                </div>
                <!--[if mso | IE]>
                    </td>
                    </tr>
                </table>
                <![endif]-->
            </div>
            </body><grammarly-desktop-integration data-grammarly-shadow-root="true"></grammarly-desktop-integration></html>
            `
        }
        await mainEmail(AccountPassword).catch(console.error) 
        user.password=undefined;
        user.salt=undefined
        user.token=undefined
        return res.status(200).json({message:"reset code send to your email", token, data:user})
    } catch (error) {
        return res.status(503).json({error:"error in processing the request", err:error, })  
    }
}

exports.resetpassword = async (req, res)=>{
    // #swagger.tags = ['User Authentication']
    // #swagger.summary = 'Reset password'
    // #swagger.description = 'Endpoint to reset password.'
    try {
        const {password, token} = req.body;
        const user = await models.User.findByToken(token);
        if(!user){
            return res.status(404).json({error:"Invalid token"})
        }
        if(!user.activate){
            return res.status(406).json({error:"your account is not activated, kindly activate your account"})
        }
        if(user.blocked){
            return res.status(406).json({error:"your account is blocked, kindly contact support team"})
        }
        const payload= {password, token:"", id:user.id}
        const data = await models.User.resetPassword(payload)
        if(!data){
            return res.status(400).json({error:"Error in reseting your account, please contact suppor",})
        }
        const AccountReset = {
            from : "support@wallet-engine.org",
            to:user.email,
            replyTo:"support@wallet-engine.org",
            subject: "Password Reset",
            html:`
            <!DOCTYPE html>
            <html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="en"><head>
            <title> Welcome to Wallet Engine </title>
            <!--[if !mso]><!-- -->
            <meta http-equiv="X-UA-Compatible" content="IE=edge" />
            <!--<![endif]-->
            <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <style type="text/css">
                #outlook a {
                padding: 0;
                }
    
                body {
                margin: 0;
                padding: 0;
                -webkit-text-size-adjust: 100%;
                -ms-text-size-adjust: 100%;
                }
    
                table,
                td {
                border-collapse: collapse;
                mso-table-lspace: 0pt;
                mso-table-rspace: 0pt;
                }
    
                img {
                border: 0;
                height: auto;
                line-height: 100%;
                outline: none;
                text-decoration: none;
                -ms-interpolation-mode: bicubic;
                }
    
                p {
                display: block;
                margin: 13px 0;
                }
            </style>
            <!--[if mso]>
                    <xml>
                    <o:OfficeDocumentSettings>
                    <o:AllowPNG/>
                    <o:PixelsPerInch>96</o:PixelsPerInch>
                    </o:OfficeDocumentSettings>
                    </xml>
                    <![endif]-->
            <!--[if lte mso 11]>
                    <style type="text/css">
                    .mj-outlook-group-fix { width:100% !important; }
                    </style>
                    <![endif]-->
            <!--[if !mso]><!-->
            <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500&amp;display=swap" rel="stylesheet" type="text/css" />
            <style type="text/css">
                @import url(https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500&amp;display=swap);
            </style>
            <!--<![endif]-->
            <style type="text/css">
                @media only screen and (min-width:480px) {
                .mj-column-per-100 {
                    width: 100% !important;
                    max-width: 100%;
                }
                }
            </style>
            <style type="text/css">
                @media only screen and (max-width:480px) {
                table.mj-full-width-mobile {
                    width: 100% !important;
                }
    
                td.mj-full-width-mobile {
                    width: auto !important;
                }
                }
            </style>
            <style type="text/css">
                a,
                span,
                td,
                th {
                -webkit-font-smoothing: antialiased !important;
                -moz-osx-font-smoothing: grayscale !important;
                }
            </style>
            </head>
    
            <body style="background-color:#F4F5FB;" data-new-gr-c-s-check-loaded="8.884.0" data-gr-ext-installed="">
            <div style="display:none;font-size:1px;color:#ffffff;line-height:1px;max-height:0px;max-width:0px;opacity:0;overflow:hidden;"> 
            Wallet Engine Reset Password </div>
            <div style="background-color:#F4F5FB;">
                <!--[if mso | IE]>
                <table
                    align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
                >
                    <tr>
                    <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                <![endif]-->
                <div style="margin:0px auto;max-width:600px;">
                <table role="presentation" style="width:100%;" cellspacing="0" cellpadding="0" border="0" align="center">
                    <tbody>
                    <tr>
                        <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
                        <!--[if mso | IE]>
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                            
                    <tr>
                
                        <td
                        class="" style="vertical-align:top;width:600px;"
                        >
                    <![endif]-->
                        <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                            <table role="presentation" style="vertical-align:top;" width="100%" cellspacing="0" cellpadding="0" border="0">
                            <tbody><tr>
                                <td style="font-size:0px;word-break:break-word;">
                                <!--[if mso | IE]>
                
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td height="5" style="vertical-align:top;height:5px;">
                
                <![endif]-->
                                <div style="height:5px;">   </div>
                                <!--[if mso | IE]>
                
                    </td></tr></table>
                
                <![endif]-->
                                </td>
                            </tr>
                            </tbody></table>
                        </div>
                        <!--[if mso | IE]>
                        </td>
                    
                    </tr>
                
                            </table>
                            <![endif]-->
                        </td>
                    </tr>
                    </tbody>
                </table>
                </div>
                <!--[if mso | IE]>
                    </td>
                    </tr>
                </table>
                
                <table
                    align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
                >
                    <tr>
                    <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                
                    <v:rect  style="width:600px;" xmlns:v="urn:schemas-microsoft-com:vml" fill="true" stroke="false">
                    <v:fill  origin="0.5, 0" position="0.5, 0" src="https://images.unsplash.com/photo-1494253109108-2e30c049369b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=600&q=80" type="tile" />
                    <v:textbox style="mso-fit-shape-to-text:true" inset="0,0,0,0">
                <![endif]-->
                <div style="background:url(https://images.unsplash.com/photo-1494253109108-2e30c049369b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=600&amp;q=80) top center / auto no-repeat;margin:0px auto;border-radius:20px;max-width:600px;">
                <div style="line-height:0;font-size:0;">
                    <table role="presentation" style="background:url(https://images.unsplash.com/photo-1494253109108-2e30c049369b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=600&amp;q=80) top center / auto no-repeat;width:100%;border-radius:20px;" cellspacing="0" cellpadding="0" border="0" background="https://images.unsplash.com/photo-1494253109108-2e30c049369b?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=600&amp;q=80" align="center">
                    <tbody>
                        <tr>
                        <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
                            <!--[if mso | IE]>
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                            
                    <tr>
                
                        <td
                        class="" style="vertical-align:top;width:600px;"
                        >
                    <![endif]-->
                            <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                            <table role="presentation" style="vertical-align:top;" width="100%" cellspacing="0" cellpadding="0" border="0">
                                <tbody><tr>
                                <td style="font-size:0px;padding:8px 0;word-break:break-word;" align="center">
                                    <table role="presentation" style="border-collapse:collapse;border-spacing:0px;" cellspacing="0" cellpadding="0" border="0">
                                    <tbody>
                                        <tr>
                                        <td style="width:150px;">
                                            <img src="${process.env.CLIENT_URL}/logo.png" style="border:0;display:block;outline:none;text-decoration:none;height:auto;width:100%;font-size:13px;" width="150" height="auto" />
                                        </td>
                                        </tr>
                                    </tbody>
                                    </table>
                                </td>
                                </tr>
                                <tr>
                                <td style="font-size:0px;word-break:break-word;">
                                    <!--[if mso | IE]>
                
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td height="250" style="vertical-align:top;height:250px;">
                
                <![endif]-->
                                    <div style="height:250px;">   </div>
                                    <!--[if mso | IE]>
                
                    </td></tr></table>
                
                <![endif]-->
                                </td>
                                </tr>
                            </tbody></table>
                            </div>
                            <!--[if mso | IE]>
                        </td>
                    
                    </tr>
                
                            </table>
                            <![endif]-->
                        </td>
                        </tr>
                    </tbody>
                    </table>
                </div>
                </div>
                <!--[if mso | IE]>
                    </v:textbox>
                </v:rect>
                
                    </td>
                    </tr>
                </table>
                
                <table
                    align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
                >
                    <tr>
                    <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                <![endif]-->
                <div style="background:#F4F5FB;background-color:#F4F5FB;margin:0px auto;max-width:600px;">
                <table role="presentation" style="background:#F4F5FB;background-color:#F4F5FB;width:100%;" cellspacing="0" cellpadding="0" border="0" align="center">
                    <tbody>
                    <tr>
                        <td style="direction:ltr;font-size:0px;padding:15px;text-align:center;">
                        <!--[if mso | IE]>
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                            
                    <tr>
                
                        <td
                        class="" style="vertical-align:top;width:570px;"
                        >
                    <![endif]-->
                        <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                            <table role="presentation" style="vertical-align:top;" width="100%" cellspacing="0" cellpadding="0" border="0">
                            </table>
                        </div>
                        <!--[if mso | IE]>
                        </td>
                    
                    </tr>
                
                            </table>
                            <![endif]-->
                        </td>
                    </tr>
                    </tbody>
                </table>
                </div>
                <!--[if mso | IE]>
                    </td>
                    </tr>
                </table>
                
                <table
                    align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
                >
                    <tr>
                    <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                <![endif]-->
                <div style="background:#ffffff;background-color:#ffffff;margin:0px auto;border-radius:20px;max-width:600px;">
                <table role="presentation" style="background:#ffffff;background-color:#ffffff;width:100%;border-radius:20px;" cellspacing="0" cellpadding="0" border="0" align="center">
                    <tbody>
                    <tr>
                        <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
                        <!--[if mso | IE]>
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                            
                    <tr>
                
                        <td
                        class="" style="vertical-align:top;width:600px;"
                        >
                    <![endif]-->
                        <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                            <table role="presentation" style="vertical-align:top;" width="100%" cellspacing="0" cellpadding="0" border="0">
                            <tbody><tr>
                                <td style="font-size:0px;padding:10px 25px;word-break:break-word;" align="left">
                                <div style="font-family:Montserrat, Helvetica, Arial, sans-serif;font-size:20px;font-weight:500;line-height:30px;text-align:left;color:#8189A9;">
                                Password reset : Wallet Engine </div>
                                </td>
                            </tr>
                            <tr>
                                <td style="font-size:0px;padding:10px 25px;word-break:break-word;" align="left">
                                <div style="font-family:Montserrat, Helvetica, Arial, sans-serif;font-size:16px;font-weight:400;line-height:20px;text-align:left;color:#8189A9;">
                                Your pasword is successfully reset <br />
                                login and start enjoying amazing service.
                                </div>
                                </td>
                            </tr>
                            <tr>
                                <td style="font-size:0px;padding:10px 25px;word-break:break-word;" align="left">
                                <div style="font-family:Montserrat, Helvetica, Arial, sans-serif;font-size:16px;font-weight:400;line-height:20px;text-align:left;color:#8189A9;">If you have any questions simply reply to this email and we would be more than happy to reply. :)</div>
                                </td>
                            </tr>
                            </tbody></table>
                        </div>
                        <!--[if mso | IE]>
                        </td>
                    
                    </tr>
                
                            </table>
                            <![endif]-->
                        </td>
                    </tr>
                    </tbody>
                </table>
                </div>
                <!--[if mso | IE]>
                    </td>
                    </tr>
                </table>
                
                <table
                    align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
                >
                    <tr>
                    <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                <![endif]-->
                <div style="background:#F4F5FB;background-color:#F4F5FB;margin:0px auto;max-width:600px;">
                <table role="presentation" style="background:#F4F5FB;background-color:#F4F5FB;width:100%;" cellspacing="0" cellpadding="0" border="0" align="center">
                    <tbody>
                    <tr>
                        <td style="direction:ltr;font-size:0px;padding:15px;text-align:center;">
                        <!--[if mso | IE]>
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                            
                    <tr>
                
                        <td
                        class="" style="vertical-align:top;width:570px;"
                        >
                    <![endif]-->
                        <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                            <table role="presentation" style="vertical-align:top;" width="100%" cellspacing="0" cellpadding="0" border="0">
                            </table>
                        </div>
                        <!--[if mso | IE]>
                        </td>
                    
                    </tr>
                
                            </table>
                            <![endif]-->
                        </td>
                    </tr>
                    </tbody>
                </table>
                </div>
                <!--[if mso | IE]>
                    </td>
                    </tr>
                </table>
                
                <table
                    align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
                >
                    <tr>
                    <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                <![endif]-->
                <div style="background:#edeef6;background-color:#edeef6;margin:0px auto;border-radius:20px;max-width:600px;">
                <table role="presentation" style="background:#edeef6;background-color:#edeef6;width:100%;border-radius:20px;" cellspacing="0" cellpadding="0" border="0" align="center">
                    <tbody>
                    <tr>
                        <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
                        <!--[if mso | IE]>
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                            
                    <tr>
                
                        <td
                        class="" style="vertical-align:top;width:600px;"
                        >
                    <![endif]-->
                        <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                            <table role="presentation" style="vertical-align:top;" width="100%" cellspacing="0" cellpadding="0" border="0">
                            <tbody><tr>
                                <td style="font-size:0px;padding:10px 25px;word-break:break-word;" align="center">
                                <!--[if mso | IE]>
                <table
                    align="center" border="0" cellpadding="0" cellspacing="0" role="presentation"
                >
                    <tr>
                
                        <td>
                        <![endif]-->
                                <table role="presentation" style="float:none;display:inline-table;" cellspacing="0" cellpadding="0" border="0" align="center">
                                    <tbody><tr>
                                    <td style="padding:4px;">
                                        <table role="presentation" style="border-radius:3px;width:24px;" cellspacing="0" cellpadding="0" border="0">
                                        <tbody><tr>
                                            <td style="font-size:0;height:24px;vertical-align:middle;width:24px;">
                                            <a href="#" target="_blank" style="color: #0078be; text-decoration: none; font-weight: 500;">
                                                <img alt="twitter-logo" src="https://codedmails.com/images/social/light/twitter-logo-transparent-light.png" style="border-radius:3px;display:block;" width="24" height="24" />
                                            </a>
                                            </td>
                                        </tr>
                                        </tbody></table>
                                    </td>
                                    </tr>
                                </tbody></table>
                                <!--[if mso | IE]>
                        </td>
                        
                        <td>
                        <![endif]-->
                                <table role="presentation" style="float:none;display:inline-table;" cellspacing="0" cellpadding="0" border="0" align="center">
                                    <tbody><tr>
                                    <td style="padding:4px;">
                                        <table role="presentation" style="border-radius:3px;width:24px;" cellspacing="0" cellpadding="0" border="0">
                                        <tbody><tr>
                                            <td style="font-size:0;height:24px;vertical-align:middle;width:24px;">
                                            <a href="#" target="_blank" style="color: #0078be; text-decoration: none; font-weight: 500;">
                                                <img alt="facebook-logo" src="https://codedmails.com/images/social/light/facebook-logo-transparent-light.png" style="border-radius:3px;display:block;" width="24" height="24" />
                                            </a>
                                            </td>
                                        </tr>
                                        </tbody></table>
                                    </td>
                                    </tr>
                                </tbody></table>
                                <!--[if mso | IE]>
                        </td>
                        
                        <td>
                        <![endif]-->
                                <table role="presentation" style="float:none;display:inline-table;" cellspacing="0" cellpadding="0" border="0" align="center">
                                    <tbody><tr>
                                    <td style="padding:4px;">
                                        <table role="presentation" style="border-radius:3px;width:24px;" cellspacing="0" cellpadding="0" border="0">
                                        <tbody><tr>
                                            <td style="font-size:0;height:24px;vertical-align:middle;width:24px;">
                                            <a href="#" target="_blank" style="color: #0078be; text-decoration: none; font-weight: 500;">
                                                <img alt="instagram-logo" src="https://codedmails.com/images/social/light/instagram-logo-transparent-light.png" style="border-radius:3px;display:block;" width="24" height="24" />
                                            </a>
                                            </td>
                                        </tr>
                                        </tbody></table>
                                    </td>
                                    </tr>
                                </tbody></table>
                                <!--[if mso | IE]>
                        </td>
                        
                        <td>
                        <![endif]-->
                                <table role="presentation" style="float:none;display:inline-table;" cellspacing="0" cellpadding="0" border="0" align="center">
                                    <tbody><tr>
                                    <td style="padding:4px;">
                                        <table role="presentation" style="border-radius:3px;width:24px;" cellspacing="0" cellpadding="0" border="0">
                                        <tbody><tr>
                                            <td style="font-size:0;height:24px;vertical-align:middle;width:24px;">
                                            <a href="#" target="_blank" style="color: #0078be; text-decoration: none; font-weight: 500;">
                                                <img alt="youtube-logo" src="https://codedmails.com/images/social/light/youtube-logo-transparent-light.png" style="border-radius:3px;display:block;" width="24" height="24" />
                                            </a>
                                            </td>
                                        </tr>
                                        </tbody></table>
                                    </td>
                                    </tr>
                                </tbody></table>
                                <!--[if mso | IE]>
                        </td>
                        
                    </tr>
                    </table>
                <![endif]-->
                                </td>
                            </tr>
                            <tr>
                                <td style="font-size:0px;padding:10px 25px;word-break:break-word;" align="center">
                                <div style="font-family:Montserrat, Helvetica, Arial, sans-serif;font-size:14px;font-weight:400;line-height:22px;text-align:center;color:#8189A9;">
                                © 2021 Wallet Engine, Lagos,<br />Nigeria</div>
                                </td>
                            </tr>
                            <tr>
                                <td style="font-size:0px;padding:10px 25px;word-break:break-word;" align="center">
                                <div style="font-family:Montserrat, Helvetica, Arial, sans-serif;font-size:14px;font-weight:400;line-height:22px;text-align:center;color:#8189A9;">Update your <a class="footer-link" href="#" style="color: #0078be; text-decoration: none; font-weight: 500;">email preferences</a> to choose the types of emails you receive, or you can <a href="" class="footer-link" style="color: #0078be; text-decoration: none; font-weight: 500;"> unsubscribe </a>from all future emails.</div>
                                </td>
                            </tr>
                            </tbody></table>
                        </div>
                        <!--[if mso | IE]>
                        </td>
                    
                    </tr>
                
                            </table>
                            <![endif]-->
                        </td>
                    </tr>
                    </tbody>
                </table>
                </div>
                <!--[if mso | IE]>
                    </td>
                    </tr>
                </table>
                
                <table
                    align="center" border="0" cellpadding="0" cellspacing="0" class="" style="width:600px;" width="600"
                >
                    <tr>
                    <td style="line-height:0px;font-size:0px;mso-line-height-rule:exactly;">
                <![endif]-->
                <div style="margin:0px auto;max-width:600px;">
                <table role="presentation" style="width:100%;" cellspacing="0" cellpadding="0" border="0" align="center">
                    <tbody>
                    <tr>
                        <td style="direction:ltr;font-size:0px;padding:20px 0;text-align:center;">
                        <!--[if mso | IE]>
                            <table role="presentation" border="0" cellpadding="0" cellspacing="0">
                            
                    <tr>
                
                        <td
                        class="" style="vertical-align:top;width:600px;"
                        >
                    <![endif]-->
                        <div class="mj-column-per-100 mj-outlook-group-fix" style="font-size:0px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                            <table role="presentation" style="vertical-align:top;" width="100%" cellspacing="0" cellpadding="0" border="0">
                            <tbody><tr>
                                <td style="font-size:0px;word-break:break-word;">
                                <!--[if mso | IE]>
                
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0"><tr><td height="1" style="vertical-align:top;height:1px;">
                
                <![endif]-->
                                <div style="height:1px;">   </div>
                                <!--[if mso | IE]>
                
                    </td></tr></table>
                
                <![endif]-->
                                </td>
                            </tr>
                            </tbody></table>
                        </div>
                        <!--[if mso | IE]>
                        </td>
                    
                    </tr>
                
                            </table>
                            <![endif]-->
                        </td>
                    </tr>
                    </tbody>
                </table>
                </div>
                <!--[if mso | IE]>
                    </td>
                    </tr>
                </table>
                <![endif]-->
            </div>
            </body><grammarly-desktop-integration data-grammarly-shadow-root="true"></grammarly-desktop-integration></html>
            `
        }
        await mainEmail(AccountReset).catch(console.error) 
        user.password=undefined;
        user.salt=undefined
        return res.status(200).json({message:"Password sucessfully reset", data:user})
    } catch (error) {
        return res.status(503).json({error:"error in ", err:error})  
    }
}
