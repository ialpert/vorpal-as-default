import expect from 'expect';
import { stdout, stderr } from 'test-console';
import asDefault from '../src/index.js';
import Vorpal from 'vorpal';

let restoreStdout;

function getCLI() {
  let vorpal = Vorpal();

  vorpal
    .command('task1')
    .action(function (args, next) {
      this.log('task1');
      next();
    });

  vorpal
    .command('task2')
    .action(function (args, next) {
      this.log('task2');
      next();
    });


  vorpal
    .command('task3')
    .action(function (args, next) {
      this.log('task3');
      next();
    });

  vorpal
    .delimiter('')
    .show();

  return vorpal;
}

beforeEach(function () {
  restoreStdout = stdout.ignore();
});

afterEach(function () {
  restoreStdout();
});


describe('Vorpal', function () {

  it('Should be an instance', ()=> {
    let instance = getCLI();
    expect(instance).toBeA(Vorpal);
  });

});


describe('As Default - plugin for Vorpal', function () {

  it('Should be a function', ()=> {
    expect(asDefault).toBeA(Function);
  });


  it('Should be a Vorpal plugin - not throwing exceptions', () => {
    expect(() => {
      getCLI().use(asDefault, 'task1');
    }).toNotThrow();
  });

});


describe('Act as default command', function () {

  it('Should execute CLI without default command', () => {

    const out = stdout.inspectSync(() => {
      expect(() => {
        getCLI().use();
      }).toNotThrow();

    });

    expect(out).toExclude('task1\n');
    expect(out).toExclude('task2\n');
    expect(out).toExclude('task3\n');

  });


  it('Should execute CLI with default command', () => {

    const out = stdout.inspectSync(() => {
      expect(() => {
        getCLI().use(asDefault, 'task2');
      }).toNotThrow();

    });

    expect(out).toExclude('task1\n');
    expect(out).toExclude('task3\n');

  });


  it('Should execute CLI with defined command', () => {

    const out = stdout.inspectSync(() => {
      expect(() => {
        getCLI().exec('task3');
      }).toNotThrow();

    });

    expect(out).toExclude('task1\n');
    expect(out).toExclude('task2\n');

  });

});