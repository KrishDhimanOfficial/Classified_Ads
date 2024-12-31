import { toast } from 'react-toastify'

const Notify = (data) => {
    if (data.message) toast.success(data.message)
    if (data.warning) toast.warning(data.warning)
    if (data.error) toast.error(data.error)
    if (data.info) toast.info(data.info)
}

export default Notify