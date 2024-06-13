import React from 'react'

function Alert(props) {
    const toFirstUpper=(message)=>
    {
        let m1=message.toLowerCase()
        return m1.charAt(0).toUpperCase()+message.slice(1)
    }
  return (
    props.alert && <div class={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
        <strong>{toFirstUpper(props.alert.type)} :</strong>{props.alert.message}
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>    
  )
}

export default Alert