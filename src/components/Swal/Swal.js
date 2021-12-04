import React from 'react'
import Swal from 'sweetalert2'

export const ErrorHandling = (message = 'Couldn\'t process request') => {
    Swal.fire({
        icon: 'error',
        text: message,
        showConfirmButton: true
    })
}

export const ConfirmHandling = async (message = 'Are you sure to continue process ?') => {
    let result
    await Swal.fire({
        icon: 'question',
        text: message,
        showConfirmButton: true,
        showCancelButton: true
    }).then(response => {
        if(response.isConfirmed){
            result = response
        }
    })
    return result
}
