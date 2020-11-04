class HomeController {
  index(request, response) {
    response.json('oi');
  }
}

export default new HomeController();
