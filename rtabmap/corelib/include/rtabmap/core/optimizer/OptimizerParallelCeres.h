#ifndef OPTIMIZERPARALLELCERES_H_
#define OPTIMIZERPARALLELCERES_H_

#include <rtabmap/core/Optimizer.h>

namespace rtabmap {

class RTABMAP_CORE_EXPORT OptimizerParallelCeres : public Optimizer
{
public:
    static bool available();

public:
    OptimizerParallelCeres(
        int iterations         = Parameters::defaultOptimizerIterations(),
        bool slam2d            = Parameters::defaultRegForce3DoF(),
        bool covarianceIgnored = Parameters::defaultOptimizerVarianceIgnored(),
        double epsilon         = Parameters::defaultOptimizerEpsilon()) :
        Optimizer(iterations, slam2d, covarianceIgnored, epsilon) {}
    OptimizerParallelCeres(const ParametersMap & parameters) :
        Optimizer(parameters) {}
    virtual ~OptimizerParallelCeres() {}

    virtual Type type() const { return kTypeParallelCeres; }

    virtual std::map<int, Transform> optimize(
        int rootId,
        const std::map<int, Transform> & poses,
        const std::multimap<int, Link> & edgeConstraints,
        cv::Mat & outputCovariance,
        std::list<std::map<int, Transform>> * intermediateGraphes = 0,
        double * finalError = 0,
        int * iterationsDone = 0);

    virtual std::map<int, Transform> optimizeBA(
        int rootId,
        const std::map<int, Transform> & posesIn,
        const std::multimap<int, Link> & links,
        const std::map<int, std::vector<CameraModel>> & models,
        std::map<int, cv::Point3f> & points3DMap,
        const std::map<int, std::map<int, FeatureBA>> & wordReferences,
        std::set<int> * outliers = 0);
};

} /* namespace rtabmap */

#endif /* OPTIMIZERPARALLELCERES_H_ */