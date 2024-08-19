import { Controller, Get, Render, Request } from '@nestjs/common';

@Controller("personaje")
export class PersonajeController {


    @Get("crear")
    @Render("personaje/crear")
    async crear(@Request() req,) {

        return {
            breadcrumbName: "DD", breadcrumbPath: "no", layout: true,
            token: req.session.user.token
        }

    }

}
