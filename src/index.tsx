import "./styles.scss";
import * as React from "react";
import * as ReactDOM from "react-dom";
import { Machine, assign, send, Action, State } from "xstate";
import { useMachine, asEffect } from "@xstate/react";
import { inspect } from "@xstate/inspect";
import { dmMachine1 } from "./dmAppointment";
import { dmMachine2 } from "./dmTimer";
import { dmMachine3 } from "./dmToDo";


inspect({
    url: "https://statecharts.io/inspect",
    iframe: false
});

import { useSpeechSynthesis, useSpeechRecognition } from 'react-speech-kit';

function say(text: string): Action<SDSContext, SDSEvent> {
    return send((_context: SDSContext) => ({ type: "SPEAK", value: text }))
}

function listen(): Action<SDSContext, SDSEvent> {
    return send('LISTEN')
}

const machine = Machine<SDSContext, any, SDSEvent>({
    id: 'root',
    type: 'parallel',
    states: {
        initial_welcome: {
            initial: 'idle',
            states: {
                idle: {
                    on: {
                        CLICK: 'prompt'
                    }
                },
                prompt: {
                    entry: send((context) => ({
                        type: "SPEAK",
                        value: `What do you want to do?`
                    })),
                    on: { ENDSPEECH: "ask" }
                },
                ask: {
                    entry: listen(),
                    on: {
                        RECOGNISED: [
                            {
                                cond: (context) => context.recResult.includes('appointment'),
                                target: ["#root.dm1.who", "idle"]
                            },
                            {
                                cond: (context) => context.recResult.includes('to-do') || context.recResult.includes('to do'),
                                target: ["#root.dm3.denial", "idle"]
                            },
                            {
                                cond: (context) => context.recResult.includes('timer'),
                                target: ["#root.dm2.denial", "idle"]
                            },
                            { target: "nomatch" }
                        ],
                    },
                },
                nomatch: {
                    entry: say("Sorry, I do not understand"),
                    on: { ENDSPEECH: "prompt" }
                }
            }
        },
        dm1: {
        ...dmMachine1
        },
        dm2: {
        ...dmMachine2
        },
        dm3: {
        ...dmMachine3
        },
        asrtts: {
            initial: 'idle',
            states: {
                idle: {
                    on: {
                        LISTEN: 'recognising',
                        SPEAK: {
                            target: 'speaking',
                            actions: assign((_context, event) => { return { ttsAgenda: event.value } })
                        }
                    }
                },
                recognising: {
		            initial: 'progress',
                    entry: 'recStart',
                    exit: 'recStop',
                    on: {
                        ASRRESULT: {
                            actions: ['recLogResult',
                                assign((_context, event) => { return { recResult: event.value } })],
                            target: '.match'
                        },
                        RECOGNISED: 'idle'
                    },
                    states: {
		    	        progress: {
			            },	    					
                        match: {
                            entry: send('RECOGNISED'),
                        },
                    }
                },
                speaking: {
                    entry: 'ttsStart',
                    on: {
                        ENDSPEECH: 'idle',
                    }
                }
            }    
        },
    },
},
    {
        actions: {
            recLogResult: (context: SDSContext) => {
                /* context.recResult = event.recResult; */
                console.log('<< ASR: ' + context.recResult);
            },
            test: () => {
                console.log('test')
            },
            logIntent: (context: SDSContext) => {
                /* context.nluData = event.data */
                console.log('<< NLU intent: ' + context.nluData.intent.name)
            }
        },
    });




interface Props extends React.HTMLAttributes<HTMLElement> {
    state: State<SDSContext, any, any, any>;
}
const ReactiveButton = (props: Props): JSX.Element => {
    switch (true) {
        case props.state.matches({ asrtts: 'recognising' }):
            return (
                <button type="button" className="glow-on-hover"
                    style={{ animation: "glowing 20s linear" }} {...props}>
                    Listening...
                </button>
            );
        case props.state.matches({ asrtts: 'speaking' }):
            return (
                <button type="button" className="glow-on-hover"
                    style={{ animation: "bordering 1s infinite" }} {...props}>
                    Speaking...
                </button>
            );
        default:
            return (
                <button type="button" className="glow-on-hover" {...props}>
                    Click to start
                </button >
            );
    }
}

function App() {
    const { speak, cancel, speaking } = useSpeechSynthesis({
        onEnd: () => {
            send('ENDSPEECH');
        },
    });
    const { listen, listening, stop } = useSpeechRecognition({
        onResult: (result: any) => {
            send({ type: "ASRRESULT", value: result });
        },
    });
    const [current, send, service] = useMachine(machine, {
        devTools: true,
        actions: {
            recStart: asEffect(() => {
                console.log('Ready to receive a command.');
                listen({
                    interimResults: false,
                    continuous: true
                });
            }),
            recStop: asEffect(() => {
                console.log('Recognition stopped.');
                stop()
            }),
            // changeColour: asEffect((context) => {
            //     console.log('Thinking...');
            //     document.body.style.background = context.recResult;
            // }),
            ttsStart: asEffect((context, effect) => {
                console.log('Speaking...');
                speak({ text: context.ttsAgenda })
            }),
            ttsCancel: asEffect((context, effect) => {
                console.log('TTS STOP...');
                cancel()
            }),
            // speak: asEffect((context) => {
	        //       console.log('Speaking...');
            //       speak({text: context.ttsAgenda })
            // }),
        },
    });


    return (
        <div className="App">
            <ReactiveButton state={current} onClick={() => send('CLICK')} />
        </div>
    )
};



/* RASA API
 *  */
const proxyurl = "https://cors-anywhere.herokuapp.com/";
const rasaurl = 'https://dashboard.heroku.com/apps/app-lab-2'
const nluRequest = (text: string) =>
    fetch(new Request(proxyurl + rasaurl, {
        method: 'POST',
        headers: { 'Origin': 'http://maraev.me' }, // only required with proxy
        body: `{"text": "${text}"}`
    }))
        .then(data => data.json());

const rootElement = document.getElementById("root");
ReactDOM.render(
    <App />,
    rootElement);