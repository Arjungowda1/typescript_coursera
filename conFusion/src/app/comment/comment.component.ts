import { Component, OnInit } from '@angular/core';
import { ModalDialogParams } from '@nativescript/angular/common';
import { TextField, Page, Slider } from 'ui/dom/Component';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
    templateUrl: './comment.component.html'
})

export class CommentModalComponent implements OnInit {

    commentForm: FormGroup;

    constructor(
        private params: ModalDialogParams,
        private formBuilder: FormBuilder,
        private page: Page
    ) {

        this.commentForm = this.formBuilder.group({
            author: ['', Validators.required],
            rating: 5,
            comment: ['', Validators.required],
        });

    }


    ngOnInit() {


    }


    onSliderValueChange(args) {
        let slider = <Slider>args.object;
        this.commentForm.patchValue({ rating: slider.value });
        
    }

    onAuthorChange(args) {
        let textField = <TextField>args.object;
        this.commentForm.patchValue({ author: textField.text });
    }

    onCommentChange(args) {
        let textField = <TextField>args.object;
        this.commentForm.patchValue({ comment: textField.text });
    }

    public submit() {

        let currentdateISO: string = (new Date()).toISOString();
        this.commentForm.value.date = currentdateISO;
        this.params.closeCallback(this.commentForm.value);
        console.log(JSON.stringify(this.commentForm.value));

    }
}