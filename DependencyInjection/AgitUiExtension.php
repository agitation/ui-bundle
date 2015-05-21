<?php

namespace Agit\UiBundle\DependencyInjection;

use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\Config\FileLocator;
use Symfony\Component\HttpKernel\DependencyInjection\Extension;
use Symfony\Component\DependencyInjection\Loader;
use Symfony\Component\DependencyInjection\Extension\PrependExtensionInterface;

/**
 * This is the class that loads and manages your bundle configuration
 *
 * To learn more see {@link http://symfony.com/doc/current/cookbook/bundles/extension.html}
 */
class AgitUiExtension extends Extension implements PrependExtensionInterface
{
    private $assetList = [
        'fonts/sourcesanspro/sourcesanspro-boldit-webfont.eot',
        'fonts/sourcesanspro/sourcesanspro-boldit-webfont.ttf',
        'fonts/sourcesanspro/sourcesanspro-boldit-webfont.woff',
        'fonts/sourcesanspro/sourcesanspro-boldit-webfont.woff2',
        'fonts/sourcesanspro/sourcesanspro-bold-webfont.eot',
        'fonts/sourcesanspro/sourcesanspro-bold-webfont.ttf',
        'fonts/sourcesanspro/sourcesanspro-bold-webfont.woff',
        'fonts/sourcesanspro/sourcesanspro-bold-webfont.woff2',
        'fonts/sourcesanspro/sourcesanspro-it-webfont.eot',
        'fonts/sourcesanspro/sourcesanspro-it-webfont.ttf',
        'fonts/sourcesanspro/sourcesanspro-it-webfont.woff',
        'fonts/sourcesanspro/sourcesanspro-it-webfont.woff2',
        'fonts/sourcesanspro/sourcesanspro-lightit-webfont.eot',
        'fonts/sourcesanspro/sourcesanspro-lightit-webfont.ttf',
        'fonts/sourcesanspro/sourcesanspro-lightit-webfont.woff',
        'fonts/sourcesanspro/sourcesanspro-lightit-webfont.woff2',
        'fonts/sourcesanspro/sourcesanspro-light-webfont.eot',
        'fonts/sourcesanspro/sourcesanspro-light-webfont.ttf',
        'fonts/sourcesanspro/sourcesanspro-light-webfont.woff',
        'fonts/sourcesanspro/sourcesanspro-light-webfont.woff2',
        'fonts/sourcesanspro/sourcesanspro-regular-webfont.eot',
        'fonts/sourcesanspro/sourcesanspro-regular-webfont.ttf',
        'fonts/sourcesanspro/sourcesanspro-regular-webfont.woff',
        'fonts/sourcesanspro/sourcesanspro-regular-webfont.woff2',
        'fonts/sourcesanspro/sourcesanspro-semiboldit-webfont.eot',
        'fonts/sourcesanspro/sourcesanspro-semiboldit-webfont.ttf',
        'fonts/sourcesanspro/sourcesanspro-semiboldit-webfont.woff',
        'fonts/sourcesanspro/sourcesanspro-semiboldit-webfont.woff2',
        'fonts/sourcesanspro/sourcesanspro-semibold-webfont.eot',
        'fonts/sourcesanspro/sourcesanspro-semibold-webfont.ttf',
        'fonts/sourcesanspro/sourcesanspro-semibold-webfont.woff',
        'fonts/sourcesanspro/sourcesanspro-semibold-webfont.woff2',
        'fonts/fontawesome/fontawesome-webfont.eot',
        'fonts/fontawesome/fontawesome-webfont.ttf',
        'fonts/fontawesome/fontawesome-webfont.woff',
        'fonts/fontawesome/fontawesome-webfont.woff2'
    ];

    // adding our own assets to assetic
    public function prepend(ContainerBuilder $Container)
    {
        $configAssets = [];

        foreach ($this->assetList as $asset)
        {
            $name = str_replace(['/', '.'], ['-', '-'], $asset);

            $configAssets[$name] = [
                'input' => "@AgitUiBundle/Resources/public/$asset",
                'output' => preg_replace('|/.*/|', '/', $asset)
            ];
        };

        $Container->prependExtensionConfig('assetic', ['assets' => $configAssets]);
    }

    /**
     * {@inheritDoc}
     */
    public function load(array $configs, ContainerBuilder $container)
    {
        $configuration = new Configuration();
        $config = $this->processConfiguration($configuration, $configs);

        $loader = new Loader\YamlFileLoader($container, new FileLocator(__DIR__.'/../Resources/config'));
        $loader->load('services.yml');
    }
}
