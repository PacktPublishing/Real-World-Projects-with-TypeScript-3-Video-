import { expect } from 'chai';
import { Calculator } from '../src/Calculator';

// Test calculations.
describe( 'Calculate', function () {

    // Test multiplication
    it( "multiply", function () {
        let result = Calculator.Multiply( 2, 5 );
        expect( result ).equal( 10 );
    } );

    // Test division
    it( "divide", function () {
        let result = Calculator.Divide( 16, 4 );
        expect( result ).equal( 4 );
    } );

    // Test subtraction
    it( "subtract", function () {
        let result = Calculator.Subtract( 7, 10 );
        expect( result ).equal( -3 );
    } );

    // Test addition
    it( "add", function () {
        let result = Calculator.Add( 3, 8 );
        expect( result ).equal( 11 );
    } );

    // Test modulus
    it( "modulus", function () {
        let result = Calculator.Modulus( 8, 3 );
        expect( result ).equal( 2 );
    } );
} );