#!/usr/bin/env node
const yargs = require( 'yargs/yargs' );
const { hideBin } = require( 'yargs/helpers' );
const argv = yargs( hideBin( process.argv ))
    .command( 'current', 'Возвращает текущую дату', () => {}, setDate )
    .command( 'add', 'Возвращает увеличенную дату', () => {}, setDate )
    .command( 'sub', 'Возвращает уменьшенную дату', () => {}, setDate )
    .option( 'year', {
        alias: 'y',
        type: 'string'
    })
    .option( 'month', {
        alias: 'm',
        type: 'string'
    })
    .option( 'day', {
        alias: 'd',
        type: 'string'
    })
    .argv;

    function setDate( argv ){

        let command = argv._[0];
        let date = new Date();
        let curDate = '';

        if ( argv.y ){
            if ( command == 'add' ){
                date.setFullYear( date.getFullYear() + Number( argv.y ) );
            }
            else if (command == 'sub'){
                date.setFullYear( date.getFullYear() - Number( argv.y ) );
            }
            else {
                curDate += date.getFullYear() + 'y';
            }
        }

        if ( argv.m ){
            if ( command == 'add' ){
                date.setMonth( date.getMonth() + Number( argv.m ) );
            }
            else if ( command == 'sub' ){
                date.setMonth( date.getMonth() - Number( argv.m ) );
            }
            else {
                curDate += date.getMonth() + 'm';
            }
        }

        if ( argv.d  ){
            if ( command == 'add' ){
                date.setDate( date.getDate() + Number( argv.d ) );
            }
            else if ( command == 'sub' ){
                date.setDate( date.getDate() - Number( argv.d ) );
            }
            else{
                curDate += getDate() + 'd';
            }
        }

        if ( curDate ){
            date = curDate;
        }

        console.log(argv);
    }
   

    