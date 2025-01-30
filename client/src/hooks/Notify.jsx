import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

const Notify = (data) => {
    const navigate = useNavigate
    if (data.message) toast.success(data.message)
    if (data.warning) toast.warning(data.warning)
    if (data.middlewareError) navigate('/login')
    if (data.info) toast.info(data.info)
    if (data.error) toast.error(data.error)
    if (data.errors) data.errors.forEach(error => toast.error(error))
}

export default Notify