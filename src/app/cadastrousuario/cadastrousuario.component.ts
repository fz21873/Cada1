
import { Component, OnInit, ViewContainerRef, TemplateRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Usuario } from '../_model/usuario';
import { UsuarioService } from '../_services/usuario.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-cadastrousuario',
  templateUrl: './cadastrousuario.component.html',
  styleUrls: ['./cadastrousuario.component.css']
})
export class CadastrousuarioComponent implements OnInit {
  usuarios: Usuario[];
  usuario: Usuario;
  registerForm: FormGroup;
  constructor(private toastr: ToastsManager,
              private vcr: ViewContainerRef,
              private usuarioService: UsuarioService,
              private fb: FormBuilder) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {

     this.getUsuarios();
     this.validation();
  }

  validation(): void {
    this.registerForm = this.fb.group({

      nome:  ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
      dataNacimento: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      senha: ['', Validators.required],
      idsexo: ['', Validators.required],
      ativo : true,
    });
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


  sexoConvert(valsexo: number): string {

    return valsexo === 1 ? 'Feminino' : 'Masculino';
  }


  activoConvert(valativo: boolean): string {

    return valativo === true ? 'Sim' : 'Não';

  }

  cadastrarUsuario(template: any): void {


        this.usuario = Object.assign({}, this.registerForm.value);
        this.usuarioService.postUsuario(this.usuario).subscribe(
          (novoUsuario: Usuario) => {
            // template.hide();
            this.getUsuarios();
            this.toastr.success('Usuario Cadastrado com Sucesso!');
            this.registerForm.reset();
          }, error => {
            this.toastr.error(`Error ao Inserir:${error}`);
            console.log(error);
          }
        );
        }


}
