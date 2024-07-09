

import { Controller, Get, Render, Res,Request } from '@nestjs/common';

@Controller("raza")
export class RazaController {


    @Get("")
    @Render("raza/razalista")
    async index(@Request() req, @Res() res) {

  
      return {
        breadcrumbName: "DD", breadcrumbPath: "no", layout: true,
        token : req.session.user.token
   
      }
  
    }


}
