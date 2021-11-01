
import withReactContent from 'sweetalert2-react-content'
import Swal from 'sweetalert2'

export async function Modal(title, txt, timer) {
    const MySwal = withReactContent(Swal)
    let timerInterval
    await MySwal.fire({
        title,
        html: txt,
        timer,
        confirmButtonColor: "#5989b4",
        timerProgressBar: false,
        didOpen: () => {
            // Swal.showLoading()
            timerInterval = setInterval(() => {
                const content = Swal.getHtmlContainer()
                if (content) {
                    const b = content.querySelector('b')
                    if (b) {
                        // b.textContent = Swal.getTimerLeft()
                    }
                }
            }, 100)
        },
        willClose: () => {
            clearInterval(timerInterval)
        }
    })
}

