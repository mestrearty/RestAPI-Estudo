"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const model_router_1 = require("../common/model-router");
const reviews_model_1 = require("./reviews.model");
class ReviewsRouter extends model_router_1.ModelRouter {
    constructor() {
        super(reviews_model_1.Review);
        this.findById = (req, resp, next) => {
            this.model.findById(req.params.id)
                .populate('user', 'name')
                .populate('restaurant', 'name')
                .then(this.render(resp, next))
                .catch(next);
        };
    }
    prepareOne(query) {
        return query.populate('user', 'name')
            .populate('restaurant', 'name');
    }
    applyRoutes(application) {
        application.get(`${this.basePath}`, this.findAll);
        application.get(`${this.basePath}/:id`, [this.validateId, this.findById]);
        application.post(`${this.basePath}`, this.save);
    }
}
exports.reviewsRouter = new ReviewsRouter();
