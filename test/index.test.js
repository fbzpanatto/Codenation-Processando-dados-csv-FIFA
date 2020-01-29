const { expect } = require('chai');
const { q1, q2, q3, q4, q5, q6 } = require('../src');

describe('Fifa data processing', () => {
    it('q1', () => {
        const result = q1();
        expect(result).to.be.an('number')
    });

    it('q2', () => {
        const result = q2();
        expect(result).to.be.an('number')
    });

    it('q3', () => {
        const result = q3();
        expect(result).to.be.an('array');
    })

    it('q4', () => {
        const result = q4();
        expect(result).to.be.an('array');
    })

    it('q5', () => {
        const result = q5();
        expect(result).to.be.an('array');
    })

    it('q6', () => {
        const result = q6();
        expect(result).to.be.an('object');
    })
})
