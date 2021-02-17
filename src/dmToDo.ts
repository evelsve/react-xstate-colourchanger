import { MachineConfig, send, Action, assign } from "xstate";
import { mapContext } from "xstate/lib/utils";


function say(text: string): Action<SDSContext, SDSEvent> {
    return send((_context: SDSContext) => ({ type: "SPEAK", value: text }))
}

function listen(): Action<SDSContext, SDSEvent> {
    return send('LISTEN')
}

export const dmMachine3: MachineConfig<SDSContext, any, SDSEvent> = ({
    initial: 'idle',
    states: {
        idle: {},
        denial: {
            initial: "denial_message",
            states: {
                denial_message: {
                    entry: say("To-do has not been developed.")
                }
        }
    }

}})
