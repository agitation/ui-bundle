agit.ns("agit.elem");

agit.elem.FormFooter = function($tfoot)
{
    $tfoot = $tfoot || agit.common.Template.get(".api-form tfoot");

    return $tfoot;
};
