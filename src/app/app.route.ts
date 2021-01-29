import { Routes, ActivatedRoute } from '@angular/router';
import { CadastrousuarioComponent } from './cadastrousuario/cadastrousuario.component';
import { RelatoriousuarioComponent } from './relatoriousuario/relatoriousuario.component';
import { UsuarioeditComponent } from './relatoriousuario/usuarioedit/usuarioedit.component';

export const ROUTES: Routes = [
    {path: 'cadastro', component: CadastrousuarioComponent},
    {path: 'relatorio', component: RelatoriousuarioComponent},
    {path: 'relatorio/:id/edit', component: UsuarioeditComponent},

];


