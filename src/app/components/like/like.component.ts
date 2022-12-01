import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Comentario } from 'src/app/interfaces/interfaces';
import { ProveedorService } from '../../services/proveedor.service';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.scss'],
})
export class LikeComponent implements OnInit {

  @Input() iter;
  @Input() userId;
  @Input() categoria;

  dId;
  likeName;
  likeCount;
  dataId;
  

  constructor(
    private proveedor: ProveedorService
  ) { }

  ngOnInit() {
    this.likeName = this.iter.like_name
    this.likeCount = this.iter.likes.length
    this.dataId = this.iter[this.categoria + '_id']

  }

  //Toggle Like, Dislike
  toggleLike(): void{
    //CASO LIKE
    if(this.likeName==='heart-outline'){
      this.likeName = 'heart';
      this.likeCount += 1
      this.proveedor.postLike(this.categoria.toUpperCase(),this.dataId,this.userId)
        .subscribe((success)=>{
          console.log('success')
        })
    // CASO DISLIKE
    } else{
      this.likeName = 'heart-outline'
      this.likeCount -= 1
      this.proveedor.deleteLike(this.categoria.toUpperCase(),this.dataId,this.userId)
        .subscribe((success)=>{
          console.log('success')
        })
    }

  }

}
