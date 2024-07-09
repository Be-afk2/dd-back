import { Body, Controller, Get, Post, Render, Request, Res } from '@nestjs/common';
import { DdWebService } from './dd-web.service';
import { JwtService } from '@nestjs/jwt';

@Controller()
export class DdWebController {
  constructor(
    private readonly ddWebService: DdWebService,
    // private jwtService: JwtService,
  ) { }

  @Get("loginView")
  @Render("login_view")
  async getHello() {
    const user = await this.ddWebService.get_user()
    return { breadcrumbName: "DD", breadcrumbPath: "no", layout: false, user }
  }



  @Get("")
  @Render("index")
  async index(@Request() req, @Res() res) {


    return {
      breadcrumbName: "DD", breadcrumbPath: "no", layout: true,
      token: req.session.user.token
    }

  }

  @Post("login")
  async login(@Body() body, @Request() req, @Res() res) {
    const data = JSON.parse(body.data)
    req.session.user = await this.ddWebService.login(data);

    req.session.save(() => {
      res.redirect('/');
    });
  }
}
