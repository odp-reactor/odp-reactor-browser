export class WindowAdapter {
    push(route) {
        console.log(`[*] ODPRouter navigate to: `,route)

        setTimeout(function(){
            var newForm;
            newForm = document.createElement('form');
            newForm.method = 'GET';
            newForm.action = route;
            document.body.appendChild(newForm);
            newForm.submit();
          }, 10)

        // window.location = route
    }
}