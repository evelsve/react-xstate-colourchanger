import { MachineConfig } from "xstate";
import { Endings } from "./index";

export const dmMachine3: MachineConfig<SDSContext, any, SDSEvent> = ({
    initial: 'idle',
    states: {
        idle: {},
        denial: {...Endings("Welcome to To-do. It will be improved later.","#root.dm3.idle")},
}})
