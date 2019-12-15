import fs from 'fs';
import path from 'path';
import { performance } from 'perf_hooks';

function runScript() {
    const t0 = performance.now();

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
            // const productsReady = this.recipe.every(
            //     chemical =>
            //         getChemicalCount(chemical) >= this.productCount * count,
            // );

            // if (!productsReady) {
            //     console.log(`${this.product} waiting for ${count} products`);
            // }

            while (!this.allProductsReady(count)) {
                let i = 0;
                while (i < this.recipe.length) {
                    const recipeName = this.recipe[i];
                    const recipeCount = this.recipe[i + 1] * count;
                    if (recipeName === 'ORE') {
                        totalOres += recipeCount;
                        storage.ORE += recipeCount;
                    } else if (getChemicalCount(recipeName) < recipeCount) {
                        const needed = recipeCount - getChemicalCount(recipeName);
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
            // console.log(
            //     `${this.product}: created ${this.productCount * count}`,
            // );
        }

        allProductsReady(count) {
            const recipe = Factories[this.product].recipe;
            let i = 0;
            while (i < recipe.length) {
                if (getChemicalCount(recipe[i]) < recipe[i + 1] * count) return false;
                i += 2;
            }
            return true;
        }
    }

    function setFactory(recipe) {
        if (!Factories) Factories = {};
        if (!Factories[recipe[0]]) Factories[recipe[0]] = new ChemicalFactory(recipe);
    }

    setChemicalCount('ORE', 0);
    for (let i = 0; i < reactionList.length; i += 1) {
        setChemicalCount(reactionList[i][0], 0);
    }

    for (let i = 0; i < reactionList.length; i += 1) {
        setFactory(reactionList[i]);
    }

    // console.log(storage);
    // console.log(Factories);

    Factories.FUEL.produce(1);
    const t1 = performance.now() - t0;

    console.log('===========================');
    console.log('==');
    console.log('==  Day 14');
    console.log('==');
    console.log('==  Part 1:');
    console.log(`==  ${totalOres}`);
    console.log('==');
    console.log(`==  Execution time: ${t1.toFixed(3)} ms`);
    console.log('==');
    // console.log('==  Part 2:');
    // console.log(`==  ${data}`);
    // console.log('==');
    // console.log(`==  Execution time: ${t1.toFixed(3)} ms`);
    // console.log('==');
    console.log('===========================\n');
}

export default { runScript };
