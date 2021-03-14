const supertest = require('supertest');
const config = require('../../config');
const app = require('../../app');

const request = supertest(app);

describe('Note Create Requests', () => {
  it('should be able to create note', async () => {
    const response = await request.post('/notes').send({
      title: 'New Note',
      content: 'Some Content'
    });

    expect(response.status).toBe(200);
    expect(response.body.title).toBe('New Note');
    expect(response.body.content).toBe('Some Content');
    expect(response.body.id).toBeDefined();
  });

  it('should be able to create clients with default title', async () => {
    const contentString = 'By default, Express doesn\'t know how to read the request body. So, we need to add a middleware to be able to parse them in every single request.';
    const response = await request.post('/notes').send({
      content: contentString,
    });

    expect(response.status).toBe(200);
    expect(response.body.title).toBe(contentString.slice(0, config.DEFAULT_LETTER_COUNT));
    expect(response.body.content).toBe(contentString);
    expect(response.body.id).toBeDefined();
  });
});

describe('Note Get Requests', () => {
    it('should be able to get all notes', async () => {
        await request.post('/notes').send({
            title: 'New Note 1',
            content: 'Some Content 1'
        });
        await request.post('/notes').send({
            title: 'New Note 2',
            content: 'Some Content 2'
        });
        const response = await request.get('/notes');
  
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body.length).toBe(2);
        expect(response.body[0].title).toBe('New Note 1');
    });
  
    it('should be able to get all notes with query', async () => {
        await request.post('/notes').send({
            title: 'New Note 1',
            content: 'Some Content 1'
        });
        await request.post('/notes').send({
          title: 'New Content 3',
          content: 'Some 3'
        });
        await request.post('/notes').send({
            title: 'New Note 2',
            content: 'Some 2'
        });
        const response = await request.get('/notes?query=Content');
  
        expect(response.status).toBe(200);
        expect(response.body).toBeDefined();
        expect(response.body.length).toBe(2);
        expect(response.body[0].title).toBe('New Note 1');
    });
  });

describe('Note Put Requests', () => {
    it('should be able to get and update note', async () => {
        await request.post('/notes').send({
            title: 'New Note 1',
            content: 'Some Content 1'
        });
        const note = await request.post('/notes').send({
            title: 'New Note 2',
            content: 'Some Content 2'
        });
        const response = await request.get(`/notes/${note.body.id}`);
  
        expect(response.status).toBe(200);
        expect(response.body.title).toBe('New Note 2');
        expect(response.body.content).toBe('Some Content 2');
        expect(response.body.id).toBeDefined();

        const updatedNote = await request.put(`/notes/${note.body.id}`).send({
            title: 'Another Note',
            content: 'Another Content 2'
        });

        expect(updatedNote.status).toBe(200);
        expect(updatedNote.body.title).toBe('Another Note');
        expect(updatedNote.body.content).toBe('Another Content 2');
        expect(updatedNote.body.id).toBeDefined();

        const deleteResponse = await request.delete(`/notes/${note.body.id}`);
        expect(deleteResponse.status).toBe(204);
    });
  });