import { Component, OnInit, ViewContainerRef  } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { ActivatedRoute } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Usuario } from '../../_model/usuario';
import { UsuarioService } from '../../_services/usuario.service';

@Component({
  selector: 'app-usuarioedit',
  templateUrl: './usuarioedit.component.html',
  styleUrls: ['./usuarioedit.component.css']
})
export class UsuarioeditComponent implements OnInit {

  usuario: Usuario = new Usuario();
  registerForm: FormGroup;
  constructor(private toastr: ToastsManager,
    private vcr: ViewContainerRef,
    private usuarioService: UsuarioService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private localeService: BsLocaleService) {
      this.toastr.setRootViewContainerRef(vcr);
    }

  ngOnInit() {

    this.validation();
    this.carregarUsuario();
  }

  carregarUsuario(): void {
    const idUsuario = +this.route.snapshot.paramMap.get('id');
    this.usuarioService.getUsuarioById(idUsuario)
    .subscribe(
       (usuario: any) => {
        this.usuario = Object.assign({}, usuario);
        this.registerForm.patchValue(this.usuario);

      }

    );
  }

  sexoConvert(valsexo: number): string {


    return valsexo === 1 ? 'Feminino' : 'Masculino';


  }


  validation(): void {
    this.registerForm = this.fb.group({
      idUsuario: [],
      nome:  ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
      dataNacimento: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      idsexo: ['', Validators.required],
      senha: ['', Validators.required],
      ativo: ['', Validators.required],

    });
  }


  editarUsuario(): void {

    this.usuario = Object.assign({ id: this.usuario.idUsuario }, this.registerForm.value);

    this.usuarioService.putUsuario(this.usuario).subscribe(
    () => {
      this.toastr.success('Editado com Sucesso!');
      this.registerForm.reset();
    }, error => {
      this.toastr.error(`Erro ao Editar: ${error}`);
    }
  );

  }


}
