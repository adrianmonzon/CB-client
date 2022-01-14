// import React from 'react'
// import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

// const Dictaphone = (props) => {
//     const { transcript, resetTranscript } = useSpeechRecognition()

//     if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
//         return null
//     }

//     return (
//         <div>
//             <button onClick={SpeechRecognition.startListening}>Start</button>
//             <button onClick={SpeechRecognition.stopListening}>Stop</button>
//             <button onClick={resetTranscript}>Reset</button>
//             <p>{props.transcript}</p>
//         </div>
//     )
// }
// export default Dictaphone

// import React, { useState, useEffect } from 'react'

// const SpeechRecognition =
//     window.SpeechRecognition || window.webkitSpeechRecognition
// const mic = new SpeechRecognition()

// mic.continuous = true
// mic.interimResults = true
// mic.lang = 'es-ES'

// function Dictaphone() {
//     const [isListening, setIsListening] = useState(false)
//     const [note, setNote] = useState(null)
//     const [savedNotes, setSavedNotes] = useState([])

//     useEffect(() => {
//         handleListen()
//     }, [isListening])

//     const handleListen = () => {
//         if (isListening) {
//             mic.start()
//             mic.onend = () => {
//                 console.log('continue..')
//                 mic.start()
//             }
//         } else {
//             mic.stop()
//             mic.onend = () => {
//                 console.log('Stopped Mic on Click')
//             }
//         }
//         mic.onstart = () => {
//             console.log('Mics on')
//         }

//         mic.onresult = event => {
//             const transcript = Array.from(event.results)
//                 .map(result => result[0])
//                 .map(result => result.transcript)
//                 .join('')
//             console.log(transcript)
//             setNote(transcript)
//             mic.onerror = event => {
//                 console.log(event.error)
//             }
//         }
//     }

//     const handleSaveNote = () => {
//         setSavedNotes([...savedNotes, note])
//         setNote('')
//     }

//     return (
//         <>
//             {/* <h1>Voice Notes</h1> */}
//             <div className="container">
//                 <div className="box">
//                     <h2>Mensaje de voz</h2>
//                     {isListening ? <span>🎙️</span> : <span>🛑🎙️</span>}
//                     <button onClick={handleSaveNote} disabled={!note}>
//                         Confirmar mensaje
//           </button>
//                     <button onClick={() => setIsListening(prevState => !prevState)}>
//                         {isListening ? "Detener" : "Grabar"}

//           </button>
//                     <p>{note}</p>
//                 </div>
//                 <div className="box">
//                     <h2>Mensajes guardados</h2>
//                     {savedNotes.map(n => (
//                         <p key={n}>{n}</p>
//                     ))}
//                 </div>
//             </div>
//         </>
//     )
// }

// export default Dictaphone