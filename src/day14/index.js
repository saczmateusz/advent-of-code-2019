import fs from 'fs';
import path from 'path';
import { performance } from 'perf_hooks';

function runScript() {
    const dataOriginal = fs
        .readFileSync(path.join(__dirname, '../../src/day14/data.txt'), 'utf8')
        .split('\n')
        .map(reaction => reaction.split(' '));

    const data = JSON.parse(JSON.stringify(dataOriginal));
    const reactionList = [];

    for (let reaction = 0; reaction < data.length; reaction += 1) {
        const recipe = [];
        let param = data[reaction].length - 1;
        while (param > 0) {
            recipe.push(data[reaction][param]);
            recipe.push(parseInt(data[reaction][param - 1], 10));
            if (data[reaction][param - 2] === '=>') {
                param -= 3;
            } else {
                param -= 2;
            }
        }
        reactionList.push(recipe);
    }

    let storage = {};

    let Factories = {};

    let totalOres = 0;

    function setChemicalCount(chemical, count) {
        if (!storage) storage = {};
        if (!storage[chemical]) storage[chemical] = 0;
        storage[chemical] = count;
    }

    function getChemicalCount(chemical) {
        return (storage && storage[chemical]) || 0;
    }

    class ChemicalFactory {
        constructor(recipe) {
            this.product = recipe[0];
            this.productCount = recipe[1];
            this.recipe = recipe.slice(2);
        }

        produce(count) {
            while (!this.allProductsReady(count)) {
                let i = 0;
                while (i < this.recipe.length) {
                    const recipeName = this.recipe[i];
                    const recipeCount = this.recipe[i + 1] * count;
                    if (recipeName === 'ORE') {
                        totalOres += recipeCount;
                        storage.ORE += recipeCount;
                    } else if (getChemicalCount(recipeName) < recipeCount) {
                        const needed =
                            recipeCount - getChemicalCount(recipeName);
                        const units = Math.ceil(
                            needed / Factories[recipeName].productCount,
                        );
                        Factories[recipeName].produce(units);
                    }
                    i += 2;
                }
            }

            let i = 0;
            while (i < this.recipe.length) {
                storage[this.recipe[i]] -= this.recipe[i + 1] * count;
                i += 2;
            }
            storage[this.product] += this.productCount * count;
        }

        allProductsReady(count) {
            const recipe = Factories[this.product].recipe;
            let i = 0;
            while (i < recipe.length) {
                if (getChemicalCount(recipe[i]) < recipe[i + 1] * count) {
                    return false;
                }
                i += 2;
            }
            return true;
        }
    }

    function setFactory(recipe) {
        if (!Factories) Factories = {};
        if (!Factories[recipe[0]]) {
            Factories[recipe[0]] = new ChemicalFactory(recipe);
        }
    }

    setChemicalCount('ORE', 0);
    for (let i = 0; i < reactionList.length; i += 1) {
        setChemicalCount(reactionList[i][0], 0);
    }

    for (let i = 0; i < reactionList.length; i += 1) {
        setFactory(reactionList[i]);
    }

    let t0 = performance.now();
    Factories.FUEL.produce(1);
    const totalOreToProduceOneFUEL = totalOres;
    const t1 = performance.now() - t0;

    t0 = performance.now();
    while (totalOres < 1000000000000) {
        Factories.FUEL.produce(1);
    }
    /* while loop breaks AFTER reaching 1 trillion OREs
    and completing current FUEL producing, given that,
    MAX FUEL needs to be reduced by 1 because it
    exceeds 1 trillion ORE limit
    BTW the code needs 310 seconds to complete on my machine */
    const fuelProduced = getChemicalCount('FUEL') - 1;
    const t2 = performance.now() - t0;

    console.log('=====================================');
    console.log('==');
    console.log('==  Day 14');
    console.log('==');
    console.log('==  Part 1:');
    console.log(`==  ${totalOreToProduceOneFUEL}`);
    console.log('==');
    console.log(`==  Execution time: ${t1.toFixed(3)} ms`);
    console.log('==');
    console.log('==  Part 2:');
    console.log(`==  ${fuelProduced}`);
    console.log('==');
    console.log(`==  Execution time: ${t2.toFixed(3)} ms`);
    console.log('==');
    console.log('=====================================\n');
}

export default { runScript };
