
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Usuario } from '../_model/usuario';
import { UsuarioService } from '../_services/usuario.service';
import { FormGroup, FormBuilder  } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal/';
@Component({
  selector: 'app-relatoriousuario',
  templateUrl: './relatoriousuario.component.html',
  styleUrls: ['./relatoriousuario.component.css']
})
export class RelatoriousuarioComponent implements OnInit {

  usuarios: Usuario[];
  usuario: Usuario;
  bodyDeletarUsuario = '';
  registerForm: FormGroup;
  nome: string ;

  usuariosFiltrados: Usuario[];
  constructor(private toastr: ToastsManager,
              private vcr: ViewContainerRef,
              private usuarioService: UsuarioService,
              private fb: FormBuilder) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  ngOnInit() {

    this.getUsuarios();
    this.validationForm();

  }

  validationForm(): void {
    this.registerForm = this.fb.group({
      nome:  [] ,
      ativo: []
    });

  }

  limpiar(): void {

    this.nome = '';
  }
  getUsuarios(): void  {

    this.usuarioService.getAllUsuario().subscribe(
      (_Usuario: Usuario[] ) => {
        this.usuarios =  _Usuario;

        console.log(_Usuario);
      }, error => {
        console.log(error);
      });
    }


    filtrarUsuario(filNome: string, filAtivo: string): void {


       if (filNome !==  '') {
      this.usuarioService.getUsuarioByNome(filNome).subscribe(
        (_Usuario: Usuario[] ) => {
         this.usuarios =  _Usuario;
         this.registerForm.reset();
          console.log(_Usuario);
        }, error => {
          console.log(error);
        });
        return;

      }

      if (filAtivo !==  '') {
        this.usuarioService.getUsuarioByAtivo(filAtivo).subscribe(
          (_Usuario: Usuario[] ) => {
            this.usuarios =  _Usuario;
            this.registerForm.reset();
            console.log(_Usuario);
          }, error => {
            console.log(error);
          });
          return;

        }


    }



    sexoConvert(valsexo: number): string {


      return valsexo === 1 ? 'Feminino' : 'Masculino';


    }

    activoConvert(valativo: boolean): string {



        return valativo === true ? 'Ativo' : 'Inativo';

    }
    openModal(template: any): void {
     // this.registerForm.reset();
      template.show();
    }

    excluirUsuario(usuario: Usuario, template: any): void {
      this.openModal(template);
      this.usuario = usuario;
      this.bodyDeletarUsuario = `Tem certeza que deseja excluir o Usuario: ${usuario.nome}, Código: ${usuario.idUsuario}`;
    }

    confirmeDelete(template: any): void {
      this.usuarioService.deleteEvento(this.usuario.idUsuario).subscribe(
        () => {
          template.hide();
          this.getUsuarios();
          this.toastr.success('Deletado com Sucesso!');
        }, error => {
          this.toastr.error(`Error ao tentar Deletar: ${error}`);
        }
        );
      }

}
