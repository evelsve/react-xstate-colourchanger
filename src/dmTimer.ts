import { MachineConfig, send, assign } from "xstate";
import { say } from "./index";


let num = 0

export const dmMachine2: MachineConfig<SDSContext, any, SDSEvent> = ({
    initial: "idle",
        states: {
            idle: {},
            timer: {
                initial: "prompt",
                on: {
                    RECOGNISED: {
                        target: "other",
                        actions: assign((context) => { return { option: context.recResult } }),
                    },
                    WAIT: {target: "annoy",
                          actions: assign(() => num++),
                        //    actions: send('SPEAK')
                        }
                },
                states: {
                    prompt: {
                        entry: say("Say something."), 
                        // action: assign(() => num === 0)
                        on: { ENDSPEECH: "ask" }
                    },
                    ask: {
                        entry: [
                            send('LISTEN'),
                            send('WAIT', {delay: 2000})
                        ]
                    }}},
                    // ...
                    annoy: {
                        entry: say('No input. Try again'),
                        on: {
                            ENDSPEECH: [
                                {cond: () => num === 0, target: '#root.dm2.timer'},
                                {cond: () => num === 1, target: '#root.dm2.timer'},
                                {cond: () => num === 2, target: '#root.dm2.timer'},
                                {target: '#root.dm2.other'}
                            ]},
                        
                    },
                    // ...
                    other: {
                        entry: say("Understood. Try silent"),
                        on: { ENDSPEECH: "#root.dm2.idle" }
                    }      
            // prompt: {
            //     on: { 
            //         ENDSPEECH: 'wait1',
            //         WAIT: 'wait2'
            // }},
            // wait1: {
            //     on: {ENDSPEECH: 'p'},
            //     entry: say("Question")
            // },
            // wait2: {
            //     on: {ENDSPEECH: 'wait2'},
            //     entry: say("No input")
            // },
}})

