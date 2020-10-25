document.addEventListener('DOMContentLoaded', function(){
    'use strict'

    const overlay = document.querySelector('.overlay');
    const quiz = document.querySelector('.quiz');
    const testButton = document.querySelector('.pass-test__button');
    const form = document.querySelector('.quiz-body__form');
    const formFieldsets = form.querySelectorAll('fieldset');
    const btnsNext = form.querySelectorAll('.form-button__btn-next');
    const btnsPrev = form.querySelectorAll('.form-button__btn-prev');
    const answersObj = {
        step0: {
            question: '',
            answers: [],
        },
        step1: {
            question: '',
            answers: [],
        },
        step2: {
            question: '',
            answers: [],
        },
        step3: {
            question: '',
            answers: [],
        },
    } 
    // console.log(formFieldsets);

    btnsNext.forEach((btn, btnIndex) => {
        btn.addEventListener('click', (event) => {
            event.preventDefault();

            formFieldsets[btnIndex].style.display = 'none';
            formFieldsets[btnIndex + 1].style.display = 'block';
        });
        btn.disabled = true;
    });

    btnsPrev.forEach((btn, btnIndex) => {
        btn.addEventListener('click', (event) => {
            event.preventDefault();

            formFieldsets[btnIndex + 1].style.display = 'none';
            formFieldsets[btnIndex].style.display = 'block';
        });
    });

    formFieldsets.forEach((fieldset, fieldsetIndex) => {
        
        if (fieldsetIndex === 0) {
            fieldset.style.display = 'block';
        } else {
            fieldset.style.display = 'none';
        }

        if (fieldsetIndex !== formFieldsets.length - 1) {
            const inputs = fieldset.querySelectorAll('input');
            const itemTitle = fieldset.querySelector('.form__title');
            answersObj[`step${fieldsetIndex}`].question = itemTitle.textContent;

            // console.log(answersObj);

            inputs.forEach((input) => {
                const parent = input.parentNode;
                input.checked = false;
                parent.classList.remove('active-radio');
                parent.classList.remove('active-checkbox');
            });
        }

        fieldset.addEventListener('change', (e) => {
            const target = e.target;
            const inputChecked = fieldset.querySelectorAll('input:checked');
            // console.log(target);
            if (inputChecked.length > 0) {
                btnsNext[fieldsetIndex].disabled = false;
            }else {
                btnsNext[fieldsetIndex].disabled = true;
            }

            if (target.classList.contains('form__radio')){
                const radios = fieldset.querySelectorAll('.form__radio');

                radios.forEach((input) => {
                    if (input === target) {
                        input.parentNode.classList.add('active-radio');
                    } else {
                        input.parentNode.classList.remove('active-radio');
                    }
                });
            } else if (target.classList.contains('form__input')) {
                target.parentNode.classList.toggle('active-checkbox');
            } else {
                return;
            }
        });
    });
    
    overlay.style.display = 'none';
    quiz.style.display = 'none';
    
    testButton.addEventListener('click', function () {
        overlay.style.display = 'block';
        quiz.style.display = 'block';
    });
});