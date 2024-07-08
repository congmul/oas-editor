import { Spectral } from '@stoplight/spectral-core';
import { oas } from '@stoplight/spectral-rulesets';
function SpectralLinter() {
    const spectralIns = new Spectral();
    //@ts-ignore
    spectralIns.setRuleset({extends: [[oas, "all"]]})

    function lintScan(apiSpec:string) {
        return spectralIns.run(apiSpec);
    }

    return {
        lintScan
    }
}

export { SpectralLinter }