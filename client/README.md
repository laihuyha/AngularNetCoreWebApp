# Client

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.1.2.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Cơ bản
 - .map() là một hàm của javascript, nó sẽ trả về một mảng mới, mỗi phần tử của mảng mới được tạo ra bởi một hàm được truyền vào map().
 - .switchMap() là một hàm của rxjs, nó sẽ trả về một observable mới, mỗi phần tử của observable mới được tạo ra bởi một hàm được truyền vào switchMap() và nó sẽ hủy các observable cũ và chỉ lắng nghe observable mới nhất.
 - .mergeMap() là một hàm của rxjs, nó sẽ trả về một observable mới, mỗi phần tử của observable mới được tạo ra bởi một hàm được truyền vào mergeMap() và nó sẽ lắng nghe tất cả các observable. không hủy các observable cũ và cho phép các observable chạy song song với nhau.
 - .pipe() là hàm tự động unsubscribe = cách loại bỏ nhu cầu quản lý subcription theo cách thủ công. Giảm nguy cơ quên hủy đăng ký subscription khi không còn sử dụng nữa (giảm memory leak).
 - .subscribe() là một hàm của rxjs, nó sẽ trả về một subscription, nó sẽ lắng nghe các observable và thực hiện một hàm được truyền vào subscribe() khi có sự thay đổi của observable.